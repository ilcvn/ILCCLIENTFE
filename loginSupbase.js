import { supabase } from "./src/supabase";

async function login() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: "loiphong5@gmail.com",
      password: "@WebsiteILC123456",
    });
  
    if (error) {
      console.error("Login failed:", error.message);
    } else {
      console.log("Logged in:", data);
    }
}

login();
