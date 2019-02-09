package controllers

import javax.inject._
import models._
import play.api.data.{Form, FormError}
import play.api.data.Forms._
import play.api.data.validation.Constraints._
import play.api.i18n._
import play.api.libs.json.Json
import play.api.mvc._

import scala.concurrent.{ExecutionContext, Future}

class ItemController @Inject()(repo: ItemRepository,
                               cc: MessagesControllerComponents
                              )(implicit ec: ExecutionContext)
  extends MessagesAbstractController(cc) {

  implicit val inventoryItemReads = Json.reads[InventoryItemTuple]
  implicit val inventoryItemWrites = Json.writes[InventoryItemTuple]
  implicit val itemReads = Json.reads[ItemResult]
  implicit val itemWrites = Json.writes[ItemResult]

  val itemForm: Form[CreateItemForm] = Form {
    mapping(
      "name" -> nonEmptyText,
      "description" -> text.verifying()
    )(CreateItemForm.apply)(CreateItemForm.unapply)
  }


  def addItem = Action.async { implicit request =>
    itemForm.bindFromRequest.fold(
      errorForm => {
        Future.successful(BadRequest(Json.toJson(errorForm.globalErrors.toString())))
      },

      item => {
        repo.create(item.name, item.description).map { item =>
          // If successful, we simply redirect to the index page.
          Ok(Json.toJson(new ItemResult(item.id, item.name, item.description, List())))
        }
      }
    )
  }


  def getItems = Action.async { implicit request =>
    repo.list().map { items =>
      Ok(Json.toJson(items))
    }
  }
}

case class CreateItemForm(name: String, description: String)
