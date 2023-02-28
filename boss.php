<?php
if(isset($_FILES['attach'])){
    $errors= array();
    $file_name = $_FILES['attach']['name'];
    $file_size =$_FILES['attach']['size'];
    $file_tmp =$_FILES['attach']['tmp_name'];
    $file_type=$_FILES['attach']['type'];
    $file_ext=strtolower(end(explode('.',$_FILES['attach']['name'])));
    
    // $extensions= array("jpeg","jpg","png");
    
    // if(in_array($file_ext,$extensions)=== false){
    //    $errors[]="extension not allowed, please choose a JPEG or PNG file.";
    // }
    
    if($file_size > 2097152){
       $errors[]='File size must be excately 2 MB';
    }
    
    if(empty($errors)==true){
       move_uploaded_file($file_tmp,"./attach/".$file_name);
       echo $file_name;
    }else{
       print_r($errors);
    }
 }
?>
 