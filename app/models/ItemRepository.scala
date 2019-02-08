package models

import javax.inject.{Inject, Singleton}
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class ItemRepository @Inject()(dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext) {

  private val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  private class ItemTable(tag: Tag) extends Table[Item](tag, "item") {

    def id = column[Long]("id", O.PrimaryKey, O.AutoInc)

    def name = column[String]("name")

    def description = column[String]("description")

    def * = (id, name, description) <> ((Item.apply _).tupled, Item.unapply)
  }

  private val items = TableQuery[ItemTable]


  def create(name: String, description: String): Future[Item] = db.run {
    (items.map(p => (p.name, p.description))
      returning items.map(_.id)
      into ((nameAge, id) => Item(id, nameAge._1, nameAge._2))
    ) += (name, description)
  }

  def list(): Future[Seq[Item]] = db.run {
    items.result
  }
}
