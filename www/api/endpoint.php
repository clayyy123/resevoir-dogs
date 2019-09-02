<?php
// DON'T REMOVE THIS: Used to simulate up to 1 second network latency
usleep(rand(0, 1000000));

// HINT: PDO connection string
$db = new PDO('sqlite:' . __DIR__ . '/../../data/database.sqlite');


function getName($alias){
  global $db;
  $query =  "SELECT name FROM robber WHERE alias = '$alias'";
  foreach ($db->query($query) as $r)
  if($r['name']){
    echo $r['name'];
  } else {
    echo '<unknown>';
  }
  
  $db = null;
}

// grabbing the value from the url
$q = $_GET["query"];
getName($q);

?>
