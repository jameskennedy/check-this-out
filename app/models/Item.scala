package models

case class ItemTuple(id: Long, name: String,  description: String)

case class ItemResult( val id: Long,  val name: String,  val description: String,
                       inventory: Seq[InventoryItemTuple])