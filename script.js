const form = document.querySelector("form"),
fileInput = form.querySelector(".file-input"),
progressArea = document.querySelector(".progress-area"),
uploadedArea = document.querySelector(".uploaded-area");

form.addEventListener("click", ()=>{
    fileInput.click();
});


fileInput.onchange = ({target}) =>{
    let file = target.files[0]; 
    if(file){
        let fileName = file.name;
        if(fileName.length >= 12){
            let splitName = fileName.split('.'); 
            fileName = splitName[0].substring(0, 12) + "... ." + splitName[1];
        }
        uploadFile(fileName)
    }
}

function uploadFile(name){
    let xhr = new XMLHttpRequest();// creating new xm obj (ajax)
    xhr.open("POST", "php/upload.php"); //sending post request to the specified utl/file
    xhr.upload.addEventListener("progress", ({loaded, total}) =>{
        let fileLoaded = Math.floor((loaded / total) * 100); 
        let fileTotal = Math.floor((total / 1000));   
        let fileSize; 
        (fileTotal < 1024) ? fileSize = fileTotal + " KB" : (loaded / (1024 * 1024)).toFixed(2) + " MB"
        let progressHTML = `<li class="row">
                                <i class="fas fa-file-alt"></i>
                                <div class="content">
                                    <div class="details">
                                        <span class="name">${name} ° uploading</span>
                                        <span class="percent">${fileLoaded}%</span>

                                    </div>
                                    <div class="progress-bar">
                                        <div class="progress" style="width: ${fileLoaded}%"></div>
                                    </div>
                                </div>
                            </li>`;

        uploadedArea.classList.add("onprogress"); 
        
        progressArea.innerHTML = progressHTML;
        
        if(loaded == total){
            progressArea.innerHTML=``;
            let uploadeHTML = `<li class="row">
                                    <i class="fas fa-file-alt"></i>
                                    <div class="content">
                                        <div class="details">
                                            <span class="name">${name} ° upload</span>
                                            <span class="percent">${fileSize}</span>
                                            
                                        </div>
                                        <i class="fas fa-check"></i>
                                    </div>
                                </li>`;
            
            uploadedArea.classList.remove("onprogress"); 
            uploadedArea.insertAdjacentHTML("afterbegin", uploadeHTML);
        }


        // console.log(e);
    });

    let formData = new FormData(form);
    xhr.send(formData);
}

