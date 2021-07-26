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

if (!isset($_REQUEST['info']) || empty($_REQUEST['info']) || $_REQUEST['info'] == '') {
    $output['status']['code'] = "400";
    $output['status']['name'] = "executed";
    $output['status']['description'] = "Info required.";
    $output['data'] = [];
    echo json_encode($output);
    die();
}

if (!isset($_REQUEST['staff']) || empty($_REQUEST['staff']) || $_REQUEST['staff'] == '') {
    $output['status']['code'] = "400";
    $output['status']['name'] = "executed";
    $output['status']['description'] = "Staff required.";
    $output['data'] = [];
    echo json_encode($output);
    die();
}

if (!isset($_REQUEST['previous']) || empty($_REQUEST['previous']) || $_REQUEST['previous'] == '') {
    $output['status']['code'] = "400";
    $output['status']['name'] = "executed";
    $output['status']['description'] = "Previous required.";
    $output['data'] = [];
    echo json_encode($output);
    die();
}

$query = 'UPDATE department SET department.'.$_REQUEST['info'].' = "'.$_REQUEST['staff'].'" WHERE department.name = "'.$_REQUEST['previous'].'"';
echo $query;
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