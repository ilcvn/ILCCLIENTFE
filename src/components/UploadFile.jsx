import { supabase } from "../supabase";

// ✅ Hàm kiểm tra & login nếu cần
async function checkLogin() {
  const { data: user } = await supabase.auth.getUser();
  if (!user) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: "loiphong5@gmail.com",
      password: "@WebsiteILC123456",
    });

    if (error) {
      console.error("❌ Login failed:", error.message);
      return false; // Đăng nhập thất bại
    } else {
      console.log("✅ Logged in:", data);
    }
  }
  return true; // Đã login
}

// ✅ Hàm upload file
export async function uploadFile(file) {
  if (!file) return console.error("❌ No file selected!");

  // 🛠 Gọi checkLogin trước khi upload
  const loggedIn = await checkLogin();
  if (!loggedIn) {
    console.error("❌ Bạn cần đăng nhập trước khi upload!");
    return null;
  }

  const fileName = `${Date.now()}-${file.name}`;
  const { data, error } = await supabase.storage
    .from("ilc.uploads")
    .upload(fileName, file, { cacheControl: "3600", upsert: false });

  if (error) {
    console.error("❌ Upload failed:", error.message);
    return null;
  }

  // ✅ Lấy URL file sau khi upload
  const { data: publicUrlData } = supabase.storage.from("ilc.uploads").getPublicUrl(fileName);

  return publicUrlData.publicUrl;
}
