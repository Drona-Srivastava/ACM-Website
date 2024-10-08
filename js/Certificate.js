function generateCertificate() {
    const excelFile = document.getElementById("excelFile").files[0];
    const imageFile = document.getElementById("imageFile").files[0];
    const outputDiv = document.getElementById("output");

    if (!excelFile || !imageFile) {
        outputDiv.textContent = "Please upload both an Excel file and an Image.";
        return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        const imageReader = new FileReader();

        imageReader.onload = function (imageEvent) {
            const image = new Image();
            image.onload = function () {
                outputDiv.innerHTML = ""; // Clear previous output

                jsonData.forEach((row) => {
                    const certificate = fillImageWithData(image, row);
                    const emailAddress = row.mailid;
                    if (emailAddress) {
                        downloadAndSendCertificate(row.haran, certificate, emailAddress);
                    } else {
                        console.error("Email address not provided for:", row.haran);
                    }
                });
            };
            image.src = imageEvent.target.result;
        };

        imageReader.readAsDataURL(imageFile);
    };

    reader.readAsArrayBuffer(excelFile);
}


function fillImageWithData(image, data) {
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0);

    context.font = "bold 40px Arial";
    context.fillStyle = "#000";
    context.fillText(data.haran, 172, 393); 

    context.font = "20px Arial";
    context.fillText(data['1131'], 497, 393); // column name "1131"

    return canvas.toDataURL("image/png");
}


function downloadAndSendCertificate(name, certificate, emailAddress) {
    // Download
    const link = document.createElement("a");
    link.href = certificate;
    link.download = `${name}_certificate.png`;
    link.click();

    // Send the email using EmailJS
    const emailServiceId = "YOUR_EMAILJS_SERVICE_ID";
    const emailTemplateId = "YOUR_EMAILJS_TEMPLATE_ID";
    const emailUserId = "YOUR_EMAILJS_PUBLIC_KEY"; //EmailJS public key

    const templateParams = {
        username: name, //parameter to the email template
    };

    //the data to send in the request body
    const data = {
        service_id: emailServiceId,
        template_id: emailTemplateId,
        user_id: emailUserId,
        template_params: templateParams,
    };

    //API call to EmailJS
    fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            if (response.ok) {
                console.log("Email sent successfully!", response);
            } else {
                console.error("Failed to send email:", response);
            }
        })
        .catch((error) => {
            console.error("Failed to send email:", error);
        });
}
