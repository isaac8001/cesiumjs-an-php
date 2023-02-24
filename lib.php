<?
// 파일 업로드 ... 업로드 된 파일명 return
function upload($file) {
    $target_dir = "attach/";
    $returnName = $_FILES["attach"]["name"];
    $target_file = $target_dir . basename($_FILES["attach"]["name"]);
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
    // Check if image file is a actual image or fake image
    if(isset($_POST["submit"])) {
        $check = getimagesize($_FILES["attach"]["tmp_name"]);
        if($check !== false) {
            echo "File is an image - " . $check["mime"] . ".";
            $uploadOk = 1;
        } else {
            echo "File is not an image.";
            $uploadOk = 0;
        }
    }
    // Check if file already exists
    if (file_exists($target_file)) {
        echo "Sorry, file already exists.";
        $uploadOk = 0;
    }
    // Check file size
    if ($_FILES["attach"]["size"] > 50000000) {
        echo "Sorry, your file is too large.";
        $uploadOk = 0;
    }
    // Allow certain file formats
    // .fbx, .obj, .glb, .dae, .gltf
    if($imageFileType != "fbx" && $imageFileType != "obj" && $imageFileType != "glb"
    && $imageFileType != "dae" && $imageFileType != "gltf" && $imageFileType != "FBX" && $imageFileType != "OBJ" && $imageFileType != "GLB" && $imageFileType != "DAE" && $imageFileType != "GLTF" ) {
        echo "typeError";
        $uploadOk = 0;
    }
    // Check if $uploadOk is set to 0 by an error
    if ($uploadOk == 0) {
        echo "fail";
    // if everything is ok, try to upload file
    } else {
        if (move_uploaded_file($_FILES["attach"]["tmp_name"], $target_file)) {
            echo $returnName;
        } else {
            echo "fail";
        }
    }
}
