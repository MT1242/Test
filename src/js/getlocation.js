
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
  let dropdown = document.getElementById("myDropdown");
  dropdown.classList.toggle("show");

  if (dropdown.classList.contains("show")) {
      dropdown.style.opacity = "1";
      dropdown.style.transform = "translateY(0)";
  } else {
      dropdown.style.opacity = "0";
      dropdown.style.transform = "translateY(-10px)";
  }
}

// Đóng dropdown nếu bấm ra ngoài
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
      let dropdown = document.getElementById("myDropdown");
      if (dropdown.classList.contains("show")) {
          dropdown.classList.remove("show");
          dropdown.style.opacity = "0";
          dropdown.style.transform = "translateY(-10px)";
      }
  }
};

// Chức năng vẽ hình khi click vào "Link 1"
let drawing = false;
let coordinates = [];

document.getElementById("drawPolygon").addEventListener("click", function () {
  drawing = true;
  coordinates = [];
  alert("Nhấp vào bản đồ để tạo các điểm. Click đúp để hoàn thành hình.");
});

map.on("click", function (e) {
  if (!drawing) return;

  let lngLat = [e.lngLat.lng, e.lngLat.lat];
  coordinates.push(lngLat);
  console.log("Điểm được thêm:", lngLat);

  // Vẽ marker tại mỗi điểm click
  new maplibregl.Marker({ color: "blue" }).setLngLat(lngLat).addTo(map);
});

map.on("dblclick", function () {
  if (!drawing || coordinates.length < 3) return;

  // Đóng polygon
  coordinates.push(coordinates[0]); // Kết nối điểm đầu với điểm cuối

  // Vẽ polygon trên bản đồ
  map.addLayer({
      id: "polygon-layer",
      type: "fill",
      source: {
          type: "geojson",
          data: {
              type: "Feature",
              geometry: {
                  type: "Polygon",
                  coordinates: [coordinates],
              },
          },
      },
      layout: {},
      paint: {
          "fill-color": "#ff0000",
          "fill-opacity": 0.5,
      },
  });

  console.log("Hoàn thành vẽ hình:", coordinates);
  drawing = false;
});
