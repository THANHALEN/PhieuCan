# CLAUDE.md

## Project Overview
Ứng dụng PWA tạo, quản lý và in phiếu cân điện tử cho Vina InterStarch.

## Architecture
Vanilla Frontend thuần (HTML5, CSS3, JavaScript ES6+). Không sử dụng framework hay build tool nặng.

## PWA Standards
- Đường dẫn tài nguyên nội bộ (sw, icons, assets) bắt buộc dùng đường dẫn tương đối (`./`) để tương thích GitHub Pages subpath. Ngoại lệ: `id`/`start_url`/`scope` trong manifest dùng URL tuyệt đối (xem mục Manifest).
- Chế độ hiển thị: standalone/fullscreen, hỗ trợ Service Worker cache offline.

## Workflow & Rules
- Chỉnh sửa có mục tiêu (Atomic changes): chỉ replace/patch đúng các dòng cần sửa, không in lại toàn bộ file nếu không cần thiết.
- Giữ nguyên cấu trúc dữ liệu cục bộ và định dạng in ấn hiện có.
- Mỗi thay đổi phải tăng phiên bản (SemVer): cập nhật đồng bộ `APP_VERSION` + `CHANGELOG` trong `index.html`, `CACHE_NAME` trong `sw.js` và `CHANGELOG.md`.
- Mọi thay đổi mã nguồn phải được kiểm tra cú pháp trước khi bàn giao.

## Service Worker & Cập nhật (bắt buộc)
- **SW không được hỏng vì cache**: mọi thao tác `caches.*` trong `install`/`activate`/`fetch` phải có `.catch(() => {})`. Nếu `waitUntil` bị reject lúc `install`, trình duyệt huỷ SW → app không cài được, không chạy offline.
- **Đăng ký SW độc lập với khởi tạo app**: gọi `register()` trước (hoặc tách khỏi) các bước `await` như mở IndexedDB, để lỗi dữ liệu không chặn PWA.
- **Tự cập nhật theo host**: trang so phiên bản đang chạy với phiên bản trên host (đọc `sw.js` bằng `fetch(..., {cache:"no-store"})`). Lệch → `registration.update()` + `SKIP_WAITING`; khi `controllerchange` (không phải lần cài đầu) → `location.reload()` một lần. Kiểm tra khi mở app, khi quay lại tab, khi có mạng trở lại, và định kỳ 10 phút.
- SW bỏ qua (không cache) request `cache:"no-store"` và chính file SW, để việc so version luôn lấy từ host. Đăng ký với `updateViaCache:"none"`.
- `install` gọi `skipWaiting()`, `activate` gọi `clients.claim()` để người dùng đang cài bản cũ nhận bản mới ngay lần mở kế tiếp.
- Mỗi lần release **phải đổi version** (SW đổi byte thì trình duyệt mới nhận bản mới).
- Kiểm tra trước khi bàn giao: `node --check` cho SW và script inline; mở bằng Chrome và xác nhận SW `activated`, `Page.getInstallabilityErrors` rỗng.

## Manifest
- `id`, `start_url`, `scope` dùng **URL tuyệt đối** của GitHub Pages (ngoại lệ có chủ đích cho quy tắc đường dẫn tương đối); `icons` giữ đường dẫn tương đối.
- Đổi `id` = Chrome coi là app khác → máy đã cài cần gỡ và cài lại.
- Test local sẽ báo `start-url-not-valid` vì `start_url` trỏ về github.io; chỉ kiểm tra installability trên bản đã deploy.

## Git & Deploy
- Pages deploy từ nhánh `main` (Deploy from a branch). Không thêm workflow Actions deploy song song (hai luồng cùng deploy sẽ tranh nhau và lỗi).
- Phiên Claude không có thông tin đăng nhập GitHub: Claude commit, người dùng push bằng `! git push`.