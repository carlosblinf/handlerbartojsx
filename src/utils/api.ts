// const API_URL = "https://cvcrea.alfredoacservices.com";
const API_URL = "http://192.168.1.109:3000";

export async function makePDF(data: any, title: string = "SamplePDF") {
  const res = fetch(API_URL + "/generator", {
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  }).then((response) => {
    response.blob().then((blob) => {
      // Creating new object of PDF file
      const fileURL = window.URL.createObjectURL(blob);
      // Setting various property values
      let alink = document.createElement("a");
      alink.href = fileURL;
      alink.download = `${title}.pdf`;
      alink.click();
    });
  });

  return "ok";
}
