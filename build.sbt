name := "LyricsAnalyzer"

version := "1.0-SNAPSHOT"

libraryDependencies ++= Seq(
  jdbc,
  anorm,
  cache
)     

play.Project.playScalaSettings

scalacOptions ++= Seq(
	"-feature",
	"-language:postfixOps"
)

libraryDependencies ++= Seq(
  "org.apache.hadoop" % "hadoop-core" % "1.0.4", 
  "org.apache.hbase"  % "hbase"       % "0.94.12"
)