package controllers

import play.api._
import play.api.mvc._
import play.api.libs.json._
import play.api.libs.functional.syntax._
import org.apache.hadoop.hbase.HBaseConfiguration
import org.apache.hadoop.hbase.client.{ HTable, Put, Get, Scan, Result }
import org.apache.hadoop.hbase.util.Bytes
import scala.collection.JavaConversions._
import org.codehaus.jackson.annotate.JsonValue

object Lyrics extends Controller {

  implicit val rds = (
    (__ \ 'title).read[String] and
    (__ \ 'artist).read[String] and
    (__ \ 'text).read[String]) tupled

  val conf = HBaseConfiguration.create()
  val table = new HTable(conf, "lyrics")

  def postLyrics = Action { request =>
    request.body.asJson.map { json =>
      json.validate[(String, String, String)].map {
        case (title, artist, text) => {
          val theput = new Put(Bytes.toBytes(title.toLowerCase() + ":" + artist.toLowerCase()))

          theput.add(Bytes.toBytes("d"), Bytes.toBytes("title"), Bytes.toBytes(title))
          theput.add(Bytes.toBytes("d"), Bytes.toBytes("artist"), Bytes.toBytes(artist))
          theput.add(Bytes.toBytes("d"), Bytes.toBytes("text"), Bytes.toBytes(text))

          table.put(theput)

          Ok(Json.obj("success" -> "Lyrics stored."))
        }
      }.recoverTotal {
        e => Ok(Json.obj("error" -> Json.toJson(JsError.toFlatJson(e))))
      }
    }.getOrElse {
      Ok(Json.obj("error" -> "Expected JSON data!"))
    }
  }

  def getAllLyrics = Action {
    val scan = new Scan

    val scanner = table.getScanner(scan)
    val results: List[Result] = scanner.iterator.toList

    val data = Seq[JsValue]()
    try {
      for (result <- results) {
        val title = new String(result.getColumn(Bytes.toBytes("d"), Bytes.toBytes("title")).get(0).getValue())
        val artist = new String(result.getColumn(Bytes.toBytes("d"), Bytes.toBytes("artist")).get(0).getValue())
        val text = new String(result.getColumn(Bytes.toBytes("d"), Bytes.toBytes("text")).get(0).getValue())
        data :+ Json.toJson(Map("title" -> Json.toJson(title), "artist" -> Json.toJson(artist), "text" -> Json.toJson(text)))
      }
    } finally {
      scanner.close
    }
    
    println(data)

    Ok(Json.toJson(data))
  }

  def getLyricsById = TODO

  def getLyricsByArtist = TODO

  def putLyrics = TODO

  def deleteLyricsById = TODO

}