# Chạy trang cưới với backend riêng

Lời chúc và RSVP sử dụng API trong `../BE`, không còn kết nối Supabase trong ứng dụng.

```sh
# Terminal 1, từ thư mục gốc
cd BE
npm run dev

# Terminal 2, từ thư mục gốc
cd FE
npm run dev
```

Node.js >= 22.13. FE chạy tại http://localhost:5173 và gọi API Render cấu hình trong `src/lib/api.ts`. Cấu hình backend và lưu dữ liệu: [BE/RUNNING.md](../BE/RUNNING.md). Dữ liệu Supabase cũ cần export để chuyển riêng nếu muốn giữ.

## Deploy frontend

- Build bằng `npm ci && npm run build`, publish thư mục `dist`.
- URL API được gắn trực tiếp trong `src/lib/api.ts`: `https://wedding-inv9.onrender.com/api`, không cần cấu hình biến môi trường frontend. Thay đổi URL trong file này rồi build/deploy lại khi chuyển backend.
- Trên backend Render, đặt `CORS_ORIGINS` gồm chính xác origin frontend (giao thức và domain, không có dấu `/` cuối), ví dụ `https://your-site.vercel.app`. Nhiều origin phân cách bằng dấu phẩy. Sau đó redeploy backend.
- Kiểm tra `https://wedding-inv9.onrender.com/api/health` trả `{"status":"ok"}`. Nếu request từ frontend trả 403 hoặc lỗi CORS, kiểm tra lại `CORS_ORIGINS` trên backend.

---

# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
# Ngan_Tao
# vansang_thudung

# wedding_fe
