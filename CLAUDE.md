# CLAUDE.md

## Project Overview
Ứng dụng PWA tạo, quản lý và in phiếu cân điện tử cho Vina InterStarch.

## Architecture
Vanilla Frontend thuần (HTML5, CSS3, JavaScript ES6+). Không sử dụng framework hay build tool nặng.

## PWA Standards
- Toàn bộ đường dẫn tài nguyên nội bộ (manifest, sw, icons, assets) bắt buộc dùng đường dẫn tương đối (`./`) để tương thích GitHub Pages subpath.
- Chế độ hiển thị: standalone/fullscreen, hỗ trợ Service Worker cache offline.

## Workflow & Rules
- Chỉnh sửa có mục tiêu (Atomic changes): chỉ replace/patch đúng các dòng cần sửa, không in lại toàn bộ file nếu không cần thiết.
- Giữ nguyên cấu trúc dữ liệu cục bộ và định dạng in ấn hiện có.
- Mọi thay đổi mã nguồn phải được kiểm tra cú pháp trước khi bàn giao.
