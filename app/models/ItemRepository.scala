package models

import scala.language.postfixOps
import javax.inject.{Inject, Singleton}
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import scala.collection.immutable.ListMap
import scala.concurrent.duration._
import scala.concurrent.{Await, ExecutionContext, Future}

@Singleton
class ItemRepository @Inject()(dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext) {

  private val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  private class ItemTable(tag: Tag) extends Table[ItemTuple](tag, "item") {

    def id = column[Long]("id", O.PrimaryKey, O.AutoInc)

    def name = column[String]("name")

    def description = column[String]("description")

    def * = (id, name, description) <> ((ItemTuple.apply _).tupled, ItemTuple.unapply)
  }

  private val items = TableQuery[ItemTable]

  private class InventoryItemTable(tag: Tag) extends Table[InventoryItemTuple](tag, "inventoryItem") {

    def id = column[Long]("id", O.PrimaryKey, O.AutoInc)

    def itemId = column[Long]("itemId")

    def formattedId = column[String]("formattedId")

    def status = column[String]("status")

    def * = (id, itemId, formattedId, status) <> ((InventoryItemTuple.apply _).tupled, InventoryItemTuple.unapply)

    def item = foreignKey("ITEM_FK", itemId, items)(_.id);
  }

  private val inventory = TableQuery[InventoryItemTable]


  def create(name: String, description: String): Future[ItemTuple] = db.run {
    (items.map(p => (p.name, p.description))
      returning items.map(_.id)
      into ((nameAge, id) => ItemTuple(id, nameAge._1, nameAge._2))
      ) += (name, description)
  }

  def list(): Future[Iterable[ItemResult]] = {
    val itemsWithInventory = (items joinLeft inventory on (_.id === _.itemId)).sortBy(_._1.name)

    val queryResult: Future[Seq[(ItemTuple, Option[InventoryItemTuple])]]
      = db.run(itemsWithInventory.result)

    queryResult.map((r) => {
        // TODO: Keep SQL result order when grouping to avoid client-side sort
        val grouped = ListMap(r.groupBy(t => t._1).toSeq.sortWith(_._1.name.toLowerCase < _._1.name.toLowerCase):_*)
        grouped.map(key_value => {
          val inventory = key_value._2.filterNot(tuple => tuple._2.isEmpty).map(tuple => tuple._2.get)
          ItemResult(key_value._1.id, key_value._1.name, key_value._1.description, inventory)
        })
      })
  }
}
