
// Khởi tạo bản đồ với vị trí mặc định
const map = new maplibregl.Map({
    style: "https://tiles.openfreemap.org/styles/liberty",
    center: [13.388, 52.517], // Vị trí mặc định
    zoom: 19.5,
    container: "map",
  });

  // Kiểm tra xem trình duyệt có hỗ trợ Geolocation không
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = [
          position.coords.longitude,
          position.coords.latitude,
        ];

        // Đặt vị trí của người dùng làm trung tâm bản đồ
        map.setCenter(userLocation);

        // Thêm marker để hiển thị vị trí của người dùng
        new maplibregl.Marker().setLngLat(userLocation).addTo(map);
      },
      (error) => {
        console.error("Lỗi khi lấy vị trí:", error);
      }
    );
  } else {
    console.error("Trình duyệt không hỗ trợ Geolocation");
  }

  // Xử lý hiển thị dropdown
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Đóng dropdown nếu bấm ra ngoài
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
      let dropdowns = document.getElementsByClassName("dropdown-content");
      for (let i = 0; i < dropdowns.length; i++) {
          let openDropdown = dropdowns[i];
          if (openDropdown.classList.contains("show")) {
              openDropdown.classList.remove("show");
          }
      }
  }
};

