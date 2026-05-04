function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  if (menu) {
    menu.classList.toggle("open");
  }
}

document.querySelectorAll("#mobileMenu a").forEach((link) => {
  link.addEventListener("click", () => {
    const menu = document.getElementById("mobileMenu");
    if (menu) {
      menu.classList.remove("open");
    }
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  {
    threshold: 0.14,
  }
);

document.querySelectorAll(".reveal").forEach((element) => {
  observer.observe(element);
});

const zaloPhone = "0877933362";

const noiDungSanPham = {
  ray: `Tôi cần báo giá ĐÈN RAY NAM CHÂM 48V.
Shop tư vấn giúp tôi:
- Thanh ray âm/nổi
- Đèn spotlight/floodlight/linear
- Nguồn 48V
- Phụ kiện đi kèm
Tôi muốn nhận báo giá tốt nhất.`,

  amtran: `Tôi cần báo giá ĐÈN ÂM TRẦN / ĐÈN PANEL.
Shop tư vấn giúp tôi:
- Công suất phù hợp
- Ánh sáng trắng/vàng/trung tính
- Giá sỉ/lẻ
Tôi muốn nhận báo giá tốt nhất.`,

  ledthanh: `Tôi cần báo giá LED THANH NHÔM NỘI THẤT.
Shop tư vấn giúp tôi:
- Led thanh nhôm tủ bếp/tủ áo/kệ
- Nguồn 12V/24V
- Phụ kiện lắp đặt
Tôi muốn nhận báo giá combo đủ bộ.`,

  nguonled: `Tôi cần báo giá NGUỒN LED 12V / 24V.
Shop tư vấn giúp tôi:
- Công suất nguồn phù hợp
- Nguồn trong nhà/ngoài trời
- Nguồn mỏng/nguồn tổ ong/nguồn đổ keo
Tôi muốn nhận báo giá tốt nhất.`,

  trangtri: `Tôi cần báo giá ĐÈN TRANG TRÍ.
Shop tư vấn giúp tôi:
- Đèn thả/đèn tường/đèn decor
- Mẫu phù hợp phòng khách, phòng ngủ, quán, showroom
Tôi muốn xem mẫu và nhận báo giá.`,

  phukien: `Tôi cần báo giá PHỤ KIỆN LED.
Shop tư vấn giúp tôi:
- Dây, jack nối, dimmer
- Công tắc, phụ kiện lắp đặt
- Phụ kiện cho thợ/công trình
Tôi muốn nhận báo giá.`,

  quattran: `Tôi cần báo giá QUẠT TRẦN.
Shop tư vấn giúp tôi:
- Quạt trần trang trí
- Quạt trần đèn
- Mẫu phù hợp phòng khách/phòng ngủ/showroom
Tôi muốn xem mẫu và nhận báo giá.`
};

function moZaloVoiNoiDung(noiDung) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(noiDung).catch(() => {});
  }

  const link = `https://zalo.me/${zaloPhone}?text=${encodeURIComponent(noiDung)}`;
  window.open(link, "_blank");
}

function baoGiaSanPham(maSanPham) {
  const noiDung = noiDungSanPham[maSanPham] || "Tôi cần nhận báo giá sản phẩm từ Vũ Lighting.";
  moZaloVoiNoiDung(noiDung);
}

function sendZalo(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const need = document.getElementById("need").value;
  const note = document.getElementById("note").value.trim();

  const msg =
`Tôi cần báo giá:
- Tên: ${name}
- SĐT: ${phone}
- Nhu cầu: ${need}
- Ghi chú: ${note || "Không có"}`;

  moZaloVoiNoiDung(msg);
}


async function loadPosts() {
  const postsList = document.getElementById("postsList");
  if (!postsList) return;

  try {
    const response = await fetch("/data/posts.json?time=" + Date.now());
    const data = await response.json();
    const posts = Array.isArray(data.posts) ? data.posts : [];

    if (!posts.length) {
      postsList.innerHTML = `
        <div class="post-card reveal active">
          <div class="post-content">
            <span class="tag">Chưa có bài</span>
            <h3>Chưa có bài đăng mới</h3>
            <p>Vào /admin để thêm bài đăng đầu tiên.</p>
          </div>
        </div>
      `;
      return;
    }

    postsList.innerHTML = posts
      .slice()
      .reverse()
      .slice(0, 6)
      .map((post) => {
        const image = post.image || "/img/thanhray.jpg";
        const category = post.category || "Bài viết";
        const title = post.title || "Bài viết mới";
        const excerpt = post.excerpt || "";
        const date = post.date || "";

        return `
          <article class="post-card reveal active">
            <div class="post-image">
              <img src="${image}" alt="${title}">
            </div>
            <div class="post-content">
              <span class="tag">${category}</span>
              <h3>${title}</h3>
              <p>${excerpt}</p>
              <span class="post-date">${date}</span>
            </div>
          </article>
        `;
      })
      .join("");
  } catch (error) {
    postsList.innerHTML = `
      <div class="post-card reveal active">
        <div class="post-content">
          <span class="tag">Lỗi tải bài</span>
          <h3>Không tải được bài viết</h3>
          <p>Kiểm tra file data/posts.json hoặc deploy lại website.</p>
        </div>
      </div>
    `;
  }
}

loadPosts();
