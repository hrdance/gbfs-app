async function getFreeBikeStatus() {
  const url = "https://beryl-gbfs-production.web.app/v2_2/Greater_Manchester/free_bike_status.json";
  try {
    const response = await fetch(url); // Wait for the fetch to complete
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json(); // Wait for the response to be parsed as JSON
    return data; // Return the JSON data
  } catch (error) {
    console.error("Error fetching JSON data:", error);
  }
}

export default getFreeBikeStatus;

getFreeBikeStatus().then(data => {
  console.log(data); // Use the JSON data here
});