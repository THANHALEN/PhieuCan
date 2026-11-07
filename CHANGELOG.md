# Changelog

Định dạng theo [Semantic Versioning](https://semver.org/lang/vi/): MAJOR.MINOR.PATCH
(sửa lỗi nhỏ → PATCH, thêm tính năng → MINOR, thay đổi phá vỡ dữ liệu/định dạng → MAJOR).

## [1.2.0] - 2026-11-07
- Thêm ô Tạp chất (%): KL tịnh = (Tổng − Bì) × (1 − tạp chất%)
- Nút Lấy từ phiếu mua hàng: nạp biển số, nhà cung cấp, hàng hóa, ghi chú từ bước 1
- Chốt phiếu cân thì đánh dấu phiếu mua hàng là đã cân
- Cần chạy SQL thêm cột `phieu_no`, `tap_chat` vào bảng `phieu_can`

## [1.1.2] - 2026-11-07
- Sửa lỗi Service Worker bị huỷ khi cache lỗi (không cài/offline được)
- Tự cập nhật: so version với host, lệch thì tải bản mới và tự tải lại

## [1.1.1] - 2026-11-07
- Manifest: id, start_url, scope dùng URL tuyệt đối để cài PWA ổn định

## [1.1.0] - 2026-11-02
- Thêm số phiên bản và nhật ký thay đổi (trong app: Cài đặt → Phiên bản)
- Bỏ mục cài đặt Ảnh chụp (dùng mặc định 1280 px / 70%)
- Link cài nhanh để cấp URL + Anon key cho thiết bị mới
- Chuẩn hóa PWA: đường dẫn tương đối `./`

## [1.0.0] - 2026-10-01
- Phiên bản đầu tiên
