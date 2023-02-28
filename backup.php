<?php
// php에서는 (+)가 (.) 이다
// basename() 함수는 순수 파일 이름만 반환하는 함수임.
// getimagesize()는 이미지의 크기나 Type에 대한 정보를 반환하는 함수다.
// $_FILES에 관한 정보 url : https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=questzz&logNo=220255928163
// $_FILES["attach"]["tmp_name"] 해석
// $_FILES -> form으로 전송받은 정보들을 담고 있는 것
// ["attach"] -> html에서 전송할 때의 name이다.
// ["tmp_mame"] -> 이것은 갑자기 어디서 나왔냐? : php가 자체적으로 지정해주는 내용이다. (request를 다루는 server에 "임시로" 저장되는 파일명임)
// $_FILES["attach"]["size"] -> 업로드된 파일의 바이트로 표현한 크기
// file_exists() 함수는 폴더 내 같은 이름의 파일이 존재하는지 여부를 확인함
// $target_dir = "./attach/";
$dir = "./attach";
$returnName = $_FILES["attach"]["name"];
$uploadOk = 1;





$imageFileType = strtolower(pathinfo($returnName,PATHINFO_EXTENSION));
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

// 파일 사이즈 체크 너무 크면 업로드 중지
if ($_FILES["attach"]["size"] > 50000000) {
    echo "Sorry, your file is too large.";
    $uploadOk = 0;
}
// 파일 확장자 중 지정된 확장자만 저장
// .fbx, .obj, .glb, .dae, .gltf
if($imageFileType != "fbx" && $imageFileType != "obj" && $imageFileType != "glb"
&& $imageFileType != "dae" && $imageFileType != "gltf" && $imageFileType != "FBX" && $imageFileType != "OBJ" && $imageFileType != "GLB" && $imageFileType != "DAE" && $imageFileType != "GLTF" ) {
    echo "typeError";
    $uploadOk = 0;
}

// Check if the file already exists in the server folder
if (file_exists($target_file)) {
    // Generate a new file name by appending a number to the end
    $count = 1;
    $file_parts = pathinfo($target_file);
    $new_file_name = $file_parts['filename'] . '_' . $count . '.' . $file_parts['extension'];
    while (file_exists($target_dir . $new_file_name)) {
        $count++;
        $new_file_name = $file_parts['filename'] . '_' . $count . '.' . $file_parts['extension'];
    }
    $target_file = $target_dir . $new_file_name;
}
// Check if $uploadOk is set to 0 by an error
// $uploadOK = 0 이면 fail을 반환함
if ($uploadOk == 0) {
    echo "fail1";
// if everything is ok, try to upload file
} else {
    if (move_uploaded_file($_FILES["attach"]["tmp_name"], $dir."/".$returnName)) {
        echo $returnName;
    } else {
        echo "fail2";
    }
}