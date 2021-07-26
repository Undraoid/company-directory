<?php


// example use from browser
// http://localhost/companydirectory/libs/php/getDepartmentByID.php?id=2

// remove next two lines for production

ini_set('display_errors', 'On');
error_reporting(E_ALL);

$executionStartTime = microtime(true);

include("config.php");
header('Content-Type: application/json; charset=UTF-8');

$conn = new mysqli($host_name, $user_name, $password, $database);

if (mysqli_connect_errno()) {

    $output['status']['code'] = "300";
    $output['status']['name'] = "failure";
    $output['status']['description'] = "database unavailable";
    $output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
    $output['data'] = [];

    mysqli_close($conn);

    echo json_encode($output);

    exit;

}

// $_REQUEST used for development / debugging. Remember to cange to $_POST for production

if (!isset($_REQUEST['staff']) || empty($_REQUEST['staff']) || $_REQUEST['staff'] == '') {
    $output['status']['code'] = "400";
    $output['status']['name'] = "executed";
    $output['status']['description'] = "Stuff required.";
    $output['data'] = [];
    echo json_encode($output);
    die();
}

$query = "DELETE FROM location WHERE name='" . $_REQUEST['staff']."'";

$result = $conn->query($query);
if (!$result) {

    $output['status']['code'] = "400";
    $output['status']['name'] = "executed";
    $output['status']['description'] = "query failed";
    $output['data'] = [];

    mysqli_close($conn);
    echo json_encode($output);

    die();

}

$data = [];

$output['status']['code'] = "200";
$output['status']['name'] = "ok";
$output['status']['description'] = "success";
$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
$output['data'] = $data;

mysqli_close($conn);

echo json_encode($output);

?>