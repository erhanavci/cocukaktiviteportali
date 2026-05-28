const ADMIN_EMAIL = "esinaykanat@gmail.com";

const state = {
  route: "home",
  selectedActivityId: null,
  vendorTab: "overview",
  adminTab: "approvals",
  currentUser: null,
  authProfile: null,
  vendorIds: [],
  adminPermissions: ["all"],
  notifications: [],
  readNotifications: new Set(),
  notificationOpen: false,
  authRedirecting: false,
  supportTickets: [],
  categories: ["Oyun grubu", "Sanat atölyesi", "Spor", "Müzik", "Dans", "Drama", "Müze/gezi", "Bilim/STEM", "Doğa", "Ebeveyn-çocuk", "Tatil kampı", "Düzenli kurs"],
  authMode: "choice",
  signupRole: "parent",
  editingChildId: null,
  editingActivityId: null,
  supabaseClient: null,
  supabaseReady: false,
  supabaseConfigError: "",
  favorites: new Set(["act-art-1"]),
  favoriteCounts: { "act-art-1": 1 },
  bookings: [],
  vendors: [
    {
      id: "ven-1",
      name: "Minik Renkler Atölyesi",
      slug: "minik-renkler",
      status: "approved",
      district: "Kadıköy",
      commissionRate: 0.12,
      plan: "FREE",
    },
    {
      id: "ven-2",
      name: "Bilim Kutusu",
      slug: "bilim-kutusu",
      status: "approved",
      district: "Beşiktaş",
      commissionRate: 0.12,
      plan: "FREE",
    },
    {
      id: "ven-3",
      name: "Müze Kaşifleri",
      slug: "muze-kasifleri",
      status: "pending",
      district: "Beyoğlu",
      commissionRate: 0.12,
      plan: "FREE",
    },
  ],
  activities: [
    {
      id: "act-art-1",
      vendorId: "ven-1",
      title: "Renkli Seramik Atölyesi",
      category: "Sanat atölyesi",
      type: "Tek seans",
      participationType: "group",
      minAge: 5,
      maxAge: 9,
      district: "Kadıköy",
      address: "Caferağa Mahallesi, Moda Caddesi No:12",
      locationQuery: "Minik Renkler Atölyesi Kadıköy",
      lat: 40.9875,
      lng: 29.0273,
      price: 650,
      status: "approved",
      visual: "linear-gradient(135deg, #0f766e, #e85d45 55%, #d99b22)",
      imageUrl: "",
      galleryImages: [],
      description:
        "Çocuklar kendi seramik kaselerini tasarlar, renk karışımlarını öğrenir ve güvenli atölye ekipmanlarıyla çalışır.",
      cancellation: "Etkinlikten 24 saat öncesine kadar ücretsiz iptal.",
      parentParticipation: "İlk 15 dakika ebeveyn eşliği önerilir.",
      sessions: [
        { id: "ses-1", start: "2026-06-01T10:00:00", end: "2026-06-01T12:00:00", capacity: 10, reserved: 6, price: 650, status: "active" },
        { id: "ses-2", start: "2026-06-03T14:00:00", end: "2026-06-03T16:00:00", capacity: 10, reserved: 3, price: 650, status: "active" },
      ],
    },
    {
      id: "act-stem-1",
      vendorId: "ven-2",
      title: "Mini Robotik ve STEM Keşfi",
      category: "Bilim/STEM",
      type: "Haftalık tekrar eden kurs",
      participationType: "group",
      minAge: 7,
      maxAge: 12,
      district: "Beşiktaş",
      address: "Levent Mahallesi, Çocuk Bilim Merkezi",
      locationQuery: "Bilim Kutusu Levent İstanbul",
      lat: 41.0812,
      lng: 29.0111,
      price: 900,
      status: "approved",
      visual: "linear-gradient(135deg, #2563eb, #0f766e 52%, #f5c451)",
      imageUrl: "",
      galleryImages: [],
      description:
        "Algoritma mantığı, sensörler ve takım çalışmasıyla çocukların problem çözme kaslarını güçlendiren uygulamalı program.",
      cancellation: "İlk ders başlamadan 24 saat öncesine kadar ücretsiz iptal.",
      parentParticipation: "Ebeveyn katılımı gerekmiyor.",
      sessions: [
        { id: "ses-3", start: "2026-06-02T16:00:00", end: "2026-06-02T17:30:00", capacity: 12, reserved: 8, price: 900, status: "active" },
        { id: "ses-4", start: "2026-06-09T16:00:00", end: "2026-06-09T17:30:00", capacity: 12, reserved: 5, price: 900, status: "active" },
      ],
    },
    {
      id: "act-play-1",
      vendorId: "ven-1",
      title: "Ebeveynli Oyun Grubu",
      category: "Oyun grubu",
      type: "Tek seans",
      participationType: "group",
      minAge: 1,
      maxAge: 3,
      district: "Kadıköy",
      address: "Göztepe Parkı yanı oyun alanı",
      locationQuery: "Göztepe Parkı Kadıköy",
      lat: 40.9761,
      lng: 29.0588,
      price: 420,
      status: "approved",
      visual: "linear-gradient(135deg, #f97316, #0ea5e9 55%, #84cc16)",
      imageUrl: "",
      galleryImages: [],
      description:
        "Duyusal oyun, ritim ve güvenli serbest hareket alanıyla 0-3 yaş dönemine uygun ebeveynli buluşma.",
      cancellation: "Etkinlikten 24 saat öncesine kadar ücretsiz iptal.",
      parentParticipation: "Ebeveyn katılımı zorunludur.",
      sessions: [
        { id: "ses-5", start: "2026-06-04T11:00:00", end: "2026-06-04T12:00:00", capacity: 8, reserved: 7, price: 420, status: "active" },
      ],
    },
    {
      id: "act-museum-1",
      vendorId: "ven-3",
      title: "Pera Müzesi Çocuk Turu",
      category: "Müze/gezi",
      type: "Fiziksel",
      participationType: "group",
      minAge: 6,
      maxAge: 10,
      district: "Beyoğlu",
      address: "Meşrutiyet Caddesi, Beyoğlu",
      locationQuery: "Pera Müzesi Beyoğlu",
      lat: 41.0316,
      lng: 28.9744,
      price: 780,
      status: "pending",
      visual: "linear-gradient(135deg, #7c3aed, #e85d45 58%, #facc15)",
      imageUrl: "",
      galleryImages: [],
      description:
        "Müze anlatımı, eskiz defteri ve mini yaratıcı görevlerle çocuklara sanat tarihini deneyimleten gezi.",
      cancellation: "Satıcı ve admin onaylı iptal/iade süreci uygulanır.",
      parentParticipation: "Ebeveynler müze lobisinde bekleyebilir.",
      sessions: [
        { id: "ses-6", start: "2026-06-06T13:00:00", end: "2026-06-06T15:00:00", capacity: 14, reserved: 2, price: 780, status: "active" },
      ],
    },
  ],
  children: [
    { id: "child-1", name: "Ada", age: 6, interests: ["Sanat", "Müze"] },
    { id: "child-2", name: "Deniz", age: 9, interests: ["STEM", "Spor"] },
  ],
};

const app = document.querySelector("#app");
const toast = document.querySelector("#toast");

try {
  state.supportTickets = JSON.parse(localStorage.getItem("supportTickets") || "[]");
} catch {
  state.supportTickets = [];
}

function saveSupportTickets() {
  localStorage.setItem("supportTickets", JSON.stringify(state.supportTickets));
}

function normalizeSupabaseConfig(config) {
  const url = String(config?.url || "").trim().replace(/\/+$/, "");
  const anonKey = String(config?.anonKey || "").trim();

  if (!url || !anonKey || url.includes("YOUR_SUPABASE") || anonKey.includes("YOUR_SUPABASE")) {
    return { ready: false, error: "" };
  }

  if (!/^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(url)) {
    return {
      ready: false,
      error: "SUPABASE_URL sadece https://PROJECT_ID.supabase.co formatında olmalı. /auth/v1, /rest/v1 veya dashboard linki eklemeyin.",
    };
  }

  return { ready: true, url, anonKey, error: "" };
}

async function initSupabase() {
  let config = window.SUPABASE_CONFIG;

  if (!config?.url || !config?.anonKey) {
    try {
      const response = await fetch("/api/config");
      if (response.ok) config = await response.json();
    } catch {
      config = null;
    }
  }

  const normalizedConfig = normalizeSupabaseConfig(config);
  state.supabaseConfigError = normalizedConfig.error;

  if (!normalizedConfig.ready || !window.supabase?.createClient) {
    state.supabaseReady = false;
    return;
  }

  state.supabaseClient = window.supabase.createClient(normalizedConfig.url, normalizedConfig.anonKey);
  state.supabaseReady = true;

  const { data } = await state.supabaseClient.auth.getSession();
  if (data.session?.user) await setSupabaseUser(data.session.user);
  await loadMarketplaceData();

  state.supabaseClient.auth.onAuthStateChange(async (_event, session) => {
    await setSupabaseUser(session?.user ?? null);
    await loadMarketplaceData();
    if (session?.user && state.authRedirecting) {
      state.route = "home";
      state.authRedirecting = false;
    }
    render();
  });
}

async function setSupabaseUser(user) {
  state.currentUser = user;
  state.authProfile = null;
  state.vendorIds = [];
  if (!user || !state.supabaseClient) return;

  const { data } = await state.supabaseClient.from("profiles").select("*").eq("id", user.id).maybeSingle();
  state.authProfile = data ?? {
    id: user.id,
    email: user.email,
    role: user.email === ADMIN_EMAIL ? "admin" : user.user_metadata?.role ?? "parent",
    full_name: user.user_metadata?.full_name ?? user.email,
  };

  if (state.authProfile.role === "parent" || user.email === ADMIN_EMAIL) {
    const { data: children } = await state.supabaseClient
      .from("children")
      .select("id, name, age, interests")
      .eq("user_id", user.id)
      .order("created_at", { ascending: true });

    if (children) {
      state.children = children.map((child) => ({
        id: child.id,
        name: child.name,
        age: child.age,
        interests: child.interests ?? [],
      }));
    }
  }

  if (state.authProfile.role === "vendor" || user.email === ADMIN_EMAIL) {
    const { data: vendorLinks } = await state.supabaseClient.from("vendor_users").select("vendor_id").eq("user_id", user.id);
    state.vendorIds = vendorLinks?.map((link) => link.vendor_id) ?? [];
    if (state.authProfile.role === "vendor" && !state.vendorIds.length) {
      await ensureVendorProfile(user);
    }
  }
}

async function ensureVendorProfile(user) {
  const vendorName = user.user_metadata?.vendor_name || user.user_metadata?.full_name || user.email;
  const { data: vendor, error } = await state.supabaseClient
    .from("vendors")
    .insert({
      name: vendorName,
      slug: `${String(vendorName).toLocaleLowerCase("tr-TR").replaceAll(" ", "-")}-${Date.now()}`,
      status: "pending",
      city: "İstanbul",
      district: "Belirlenecek",
      commission_rate: 0.12,
      plan_code: "FREE",
    })
    .select("id")
    .single();

  if (!error && vendor?.id) {
    await state.supabaseClient.from("vendor_users").insert({
      vendor_id: vendor.id,
      user_id: user.id,
      role: "owner",
    });
    state.vendorIds = [vendor.id];
  }
}

function isAdmin() {
  return state.currentUser?.email === ADMIN_EMAIL;
}

function isVendor() {
  return state.authProfile?.role === "vendor";
}

function isParent() {
  return state.authProfile?.role === "parent";
}

function profileLabel() {
  if (!state.currentUser) return "Giriş";
  if (isAdmin()) return state.authProfile?.full_name || "Admin";
  if (isVendor()) return "Satıcı";
  return state.authProfile?.full_name || "Profil";
}

function userInitials() {
  const source = state.authProfile?.full_name || state.currentUser?.email || "?";
  return source
    .split(/[ @.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function notificationItems() {
  const items = state.notifications.map((item, index) => ({
    id: item.id || `local-${index}-${item.text}`,
    text: item.text,
    meta: item.meta || "Bildirim",
    route: item.route || "home",
    tab: item.tab || "",
    activityId: item.activityId || "",
  }));

  if (isAdmin()) {
    state.vendors
      .filter((vendor) => vendor.status === "pending")
      .forEach((vendor) =>
        items.push({
          id: `admin-vendor-${vendor.id}`,
          text: `${vendor.name} firma onayı bekliyor`,
          meta: "Admin onayı",
          route: "admin",
          tab: "approvals",
        }),
      );
    state.activities
      .filter((activity) => activity.status === "pending")
      .forEach((activity) =>
        items.push({
          id: `admin-activity-${activity.id}`,
          text: `${activity.title} etkinlik onayı bekliyor`,
          meta: getVendor(activity.vendorId)?.name || "Etkinlik",
          route: "admin",
          tab: "approvals",
          activityId: activity.id,
        }),
      );
  }

  if (isVendor()) {
    const vendor = currentVendor();
    const vendorActivities = state.activities.filter((activity) => activity.vendorId === vendor?.id);
    vendorActivities.forEach((activity) => {
      const count = favoriteCount(activity.id);
      if (count > 0) {
        items.push({
          id: `vendor-favorite-${activity.id}-${count}`,
          text: `${activity.title} ${count} kişi tarafından favorilere eklendi`,
          meta: "Favoriler",
          route: "detail",
          activityId: activity.id,
        });
      }
    });
    state.bookings
      .filter((booking) => vendorActivities.some((activity) => activity.id === booking.activityId))
      .slice(0, 8)
      .forEach((booking) => {
        const found = getSession(booking.sessionId);
        items.push({
          id: `vendor-booking-${booking.id}`,
          text: `${found?.activity.title || "Etkinlik"} için yeni satın alma`,
          meta: `${money(booking.totalAmount)} · ${booking.status}`,
          route: "vendor",
          tab: "bookings",
        });
      });
  }

  return items;
}

function unreadCount() {
  return notificationItems().filter((item) => !state.readNotifications.has(item.id)).length;
}

function currentVendor() {
  if (state.vendorIds.length) return state.vendors.find((vendor) => vendor.id === state.vendorIds[0]) ?? null;
  if (!state.supabaseReady && isVendor()) return state.vendors[0] ?? null;
  if (isAdmin()) return state.vendors[0] ?? null;
  return null;
}

function visualForIndex(index) {
  return [
    "linear-gradient(135deg, #0f766e, #e85d45 55%, #d99b22)",
    "linear-gradient(135deg, #2563eb, #0f766e 52%, #f5c451)",
    "linear-gradient(135deg, #f97316, #0ea5e9 55%, #84cc16)",
    "linear-gradient(135deg, #7c3aed, #e85d45 58%, #facc15)",
  ][index % 4];
}

async function loadMarketplaceData() {
  if (!state.supabaseReady) return;

  const { data: vendors } = await state.supabaseClient
    .from("vendors")
    .select("*")
    .order("created_at", { ascending: false });

  if (vendors) {
    state.vendors = vendors.map((vendor) => ({
      id: vendor.id,
      name: vendor.name,
      slug: vendor.slug,
      status: vendor.status,
      district: vendor.district,
      commissionRate: Number(vendor.commission_rate ?? 0.12),
      plan: vendor.plan_code ?? "FREE",
    }));
  }

  const { data: activities } = await state.supabaseClient
    .from("activities")
    .select("*, category:categories(name), sessions:activity_sessions(*)")
    .order("created_at", { ascending: false });

  if (activities) {
    state.activities = activities.map((activity, index) => ({
      id: activity.id,
      vendorId: activity.vendor_id,
      title: activity.title,
      category: activity.category?.name ?? "Etkinlik",
      type: activity.activity_type,
      participationType: activity.participation_type ?? "group",
      minAge: activity.min_age,
      maxAge: activity.max_age,
      district: activity.district,
      address: activity.address ?? activity.location_address ?? "",
      locationQuery: activity.location_query ?? activity.address ?? "",
      lat: activity.lat == null ? null : Number(activity.lat),
      lng: activity.lng == null ? null : Number(activity.lng),
      price: Number(activity.sessions?.[0]?.price ?? 0),
      status: activity.status,
      visual: visualForIndex(index),
      imageUrl: activity.image_url ?? "",
      galleryImages: activity.gallery_image_urls ?? [],
      description: activity.description,
      cancellation: activity.cancellation_policy,
      parentParticipation: "Satıcı bilgisinde belirtilecek.",
      sessions: (activity.sessions ?? []).map((session) => ({
        id: session.id,
        start: session.start_at,
        end: session.end_at,
        capacity: session.capacity,
        reserved: session.reserved_count,
        price: Number(session.price),
        status: session.status,
      })),
    }));
  }

  await loadFavoriteData();
  await loadBookingData();
  await loadSupportTickets();
}

async function loadSupportTickets() {
  if (!state.supabaseReady || !state.currentUser) return;

  const { data, error } = await state.supabaseClient
    .from("support_tickets")
    .select("*")
    .order("created_at", { ascending: false });
  if (error || !data) return;

  state.supportTickets = data.map((ticket) => ({
    id: ticket.id,
    subject: ticket.subject,
    type: ticket.type,
    message: ticket.message,
    email: ticket.email,
    role: ticket.role,
    status: ticket.status,
    reply: ticket.reply || "",
    userId: ticket.user_id,
    createdAt: ticket.created_at,
  }));
  saveSupportTickets();
}

async function loadFavoriteData() {
  if (!state.supabaseReady || !state.currentUser) return;

  const { data, error } = await state.supabaseClient.from("favorites").select("activity_id,user_id");
  if (error) return;

  state.favoriteCounts = {};
  data.forEach((favorite) => {
    state.favoriteCounts[favorite.activity_id] = (state.favoriteCounts[favorite.activity_id] || 0) + 1;
  });

  if (isParent()) {
    state.favorites = new Set(data.filter((favorite) => favorite.user_id === state.currentUser.id).map((favorite) => favorite.activity_id));
  }
}

async function loadBookingData() {
  if (!state.supabaseReady || !state.currentUser) return;

  const { data, error } = await state.supabaseClient
    .from("bookings")
    .select("*, user:profiles(email, full_name), participants:booking_participants(child_id, child:children(id, name, age))")
    .order("created_at", { ascending: false });
  if (error || !data) return;

  state.bookings = data
    .map((booking) => {
      const found = getSession(booking.session_id);
      if (!found) return null;
      const vendor = getVendor(found.activity.vendorId);
      const totalAmount = Number(booking.total_amount ?? found.session.price ?? 0);
      const commissionRate = vendor?.commissionRate ?? 0.12;
      return {
        id: booking.id,
        activityId: found.activity.id,
        sessionId: booking.session_id,
        childId: booking.participants?.[0]?.child_id ?? "",
        childIds: (booking.participants ?? []).map((participant) => participant.child_id),
        childNames: (booking.participants ?? []).map((participant) => participant.child?.name).filter(Boolean),
        buyerName: booking.user?.full_name || booking.user?.email || "",
        buyerEmail: booking.user?.email || "",
        status: booking.status,
        paymentProvider: "Supabase",
        totalAmount,
        commissionRate,
        commissionAmount: Math.round(totalAmount * commissionRate),
        createdAt: booking.created_at,
        notes: "",
      };
    })
    .filter(Boolean);
}

const money = (amount) =>
  new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(amount);

const dateTime = (iso) =>
  new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "short",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));

const dateOnly = (iso) => {
  if (!iso) return "";
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
};

const timeOnly = (iso) => {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
};

const durationMinutes = (start, end) => Math.max(30, Math.round((new Date(end) - new Date(start)) / 60000) || 120);

function localDateTimeFromDuration(date, startTime, minutes) {
  const start = new Date(`${date}T${startTime}:00`);
  const end = new Date(start.getTime() + Number(minutes || 120) * 60000);
  return `${end.getFullYear()}-${String(end.getMonth() + 1).padStart(2, "0")}-${String(end.getDate()).padStart(2, "0")}T${String(end.getHours()).padStart(2, "0")}:${String(end.getMinutes()).padStart(2, "0")}:00`;
}

function mapEmbedUrl(activity) {
  const query = encodeURIComponent(activity.locationQuery || activity.address || `${activity.title} ${activity.district} İstanbul`);
  return `https://maps.google.com/maps?q=${query}&output=embed`;
}

function googleMapsSearchUrl(activity) {
  const query = encodeURIComponent(activity.locationQuery || activity.address || `${activity.title} ${activity.district} İstanbul`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

function remainingLabel(activity) {
  const remaining = activity.sessions.reduce((sum, session) => sum + Math.max(0, session.capacity - session.reserved), 0);
  if (activity.participationType === "private") return remaining > 0 ? "Bire bir uygun" : "Bire bir dolu";
  return `${remaining} kişilik yer kaldı`;
}

function favoriteCount(activityId) {
  return state.favoriteCounts[activityId] || 0;
}

function isUuid(value) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(value || ""));
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve("");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function uploadActivityImage(file, vendorId) {
  if (!file || !state.supabaseClient) return "";

  const extension = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`;
  const path = `${vendorId}/${filename}`;
  const { error } = await state.supabaseClient.storage.from("activity-images").upload(path, file, {
    cacheControl: "3600",
    upsert: true,
  });

  if (error) throw error;

  const { data } = state.supabaseClient.storage.from("activity-images").getPublicUrl(path);
  return data.publicUrl;
}

async function uploadActivityImages(files, vendorId) {
  const list = Array.from(files || []);
  const urls = [];
  for (const file of list) {
    urls.push(await uploadActivityImage(file, vendorId));
  }
  return urls;
}

function getVendor(id) {
  return state.vendors.find((vendor) => vendor.id === id);
}

function getSession(sessionId) {
  for (const activity of state.activities) {
    const session = activity.sessions.find((item) => item.id === sessionId);
    if (session) return { activity, session };
  }
  return null;
}

function publishedActivities() {
  return state.activities.filter((activity) => {
    const vendor = getVendor(activity.vendorId);
    return activity.status === "approved" && vendor?.status === "approved";
  });
}

function routeFromPath() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  if (path === "/admin") return "admin";
  return "home";
}

function syncPathForRoute(route) {
  const targetPath = route === "admin" ? "/admin" : "/";
  if (window.location.pathname !== targetPath) {
    window.history.pushState({ route }, "", targetPath);
  }
}

function setRoute(route, id) {
  state.route = route;
  state.selectedActivityId = id ?? state.selectedActivityId;
  state.notificationOpen = false;
  document.querySelector(".primary-nav")?.classList.remove("open");
  syncPathForRoute(route);
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderAccessGate(title, message, cta = "Giriş yap") {
  app.innerHTML = `
    <section class="section-shell">
      <div class="panel access-panel">
        <p class="eyebrow">Yetki kontrolü</p>
        <h2>${title}</h2>
        <p class="muted">${message}</p>
        <div class="button-row">
          <button class="primary-action" data-route="auth">${cta}</button>
          <button class="ghost-action" data-route="home">Ana sayfa</button>
        </div>
      </div>
    </section>
  `;
}

function renderFavorites() {
  if (!isParent()) {
    renderAccessGate("Ebeveyn hesabı gerekli", "Favoriler alanı ebeveyn hesabıyla görüntülenir.");
    return;
  }
  const favorites = [...state.favorites].map((id) => state.activities.find((activity) => activity.id === id)).filter(Boolean);
  app.innerHTML = `
    <section class="section-shell">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Ebeveyn hesabı</p>
          <h2>Favoriler</h2>
        </div>
      </div>
      <div class="activity-grid">${favorites.length ? favorites.map((activity) => `
        <article class="activity-card">
          <div class="activity-visual" style="${activity.imageUrl ? `--image:url('${activity.imageUrl}')` : `--visual:${activity.visual}`}"><strong>${activity.category}</strong></div>
          <div class="activity-body"><h3>${activity.title}</h3><p class="muted">${remainingLabel(activity)}</p><button class="primary-action" data-detail="${activity.id}">Detay</button></div>
        </article>`).join("") : `<div class="empty-state">Favori listeniz boş.</div>`}</div>
    </section>
  `;
}

function renderSupport() {
  if (!state.currentUser) {
    renderAccessGate("Giriş gerekli", "Destek talebi oluşturmak için giriş yapın.");
    return;
  }
  if (isAdmin()) {
    state.adminTab = "support";
    renderAdmin();
    return;
  }
  const tickets = state.supportTickets.filter((ticket) => ticket.email === state.currentUser.email);
  app.innerHTML = `
    <section class="section-shell">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Destek</p>
          <h2>Destek taleplerim</h2>
        </div>
      </div>
      <div class="detail-layout">
        <article class="panel">
          <h3>Gönderdiğim talepler</h3>
          <div class="sessions">
            ${
              tickets.length
                ? tickets
                    .map(
                      (ticket) => `
                        <div class="mini-card">
                          <div class="panel-heading">
                            <div>
                              <strong>${ticket.subject}</strong>
                              <p class="muted">${ticket.type}</p>
                            </div>
                            ${supportStatusPill(ticket.status)}
                          </div>
                          <p>${ticket.message}</p>
                          ${ticket.reply ? `<div class="support-reply"><strong>Yanıt</strong><p>${ticket.reply}</p></div>` : `<p class="muted">Henüz yanıtlanmadı.</p>`}
                        </div>
                      `,
                    )
                    .join("")
                : `<div class="empty-state">Henüz destek talebi göndermediniz.</div>`
            }
          </div>
        </article>
        <aside class="panel">
          <h3>Yeni destek talebi</h3>
          <form id="supportForm" class="form-grid">
            <label><span>Konu</span><input name="subject" required placeholder="Rezervasyon / etkinlik / ödeme" /></label>
            <label><span>Tip</span><select name="type"><option>Destek</option><option>Şikayet</option><option>İade</option></select></label>
            <label class="wide"><span>Mesaj</span><textarea name="message" required></textarea></label>
            <button class="primary-action wide" type="submit">Talep gönder</button>
          </form>
        </aside>
      </div>
    </section>
  `;
}

function updateNav() {
  const authButton = document.querySelector("#authNav");
  const notificationButton = document.querySelector("#notificationNav");
  const bookingsButton = document.querySelector('[data-route="bookings"]');
  const vendorButton = document.querySelector('[data-route="vendor"]');
  const supportButton = document.querySelector('[data-route="support"]');
  const pricingButton = document.querySelector('[data-route="pricing"]');
  if (bookingsButton) bookingsButton.hidden = !isParent();
  if (vendorButton) vendorButton.hidden = !isVendor();
  if (supportButton) supportButton.hidden = isAdmin();
  if (pricingButton) pricingButton.hidden = !isVendor();
  if (notificationButton) {
    notificationButton.hidden = !state.currentUser;
    notificationButton.innerHTML = `<span aria-hidden="true">🔔</span>${unreadCount() ? `<b>${unreadCount()}</b>` : ""}`;
  }
  if (authButton) {
    authButton.innerHTML = state.currentUser
      ? `<span class="nav-avatar" aria-hidden="true">${userInitials()}</span><span>${profileLabel()}</span>`
      : "Giriş";
    authButton.dataset.route = isAdmin() ? "admin" : "auth";
  }

  document.querySelectorAll(".nav-link").forEach((button) => {
    button.classList.toggle("active", button.dataset.route === state.route);
  });
  notificationButton?.classList.toggle("active", state.notificationOpen);
  renderNotificationMenu();
}

function renderNotificationMenu() {
  document.querySelector("#notificationMenu")?.remove();
  if (!state.notificationOpen || !state.currentUser) return;

  const menu = document.createElement("div");
  menu.id = "notificationMenu";
  menu.className = "notification-menu";
  const items = notificationItems();
  menu.innerHTML = `
    <div class="panel-heading">
      <h3>Bildirimler</h3>
      <button class="ghost-action compact-action" data-mark-notifications-read>Okundu</button>
    </div>
    <div class="sessions">
      ${
        items.length
          ? items
              .map(
                (item) => `
                  <button class="notification-item ${state.readNotifications.has(item.id) ? "read" : ""}" data-open-notification="${item.id}" data-notification-route="${item.route}" data-notification-tab="${item.tab}" data-notification-activity="${item.activityId}">
                    <strong>${item.text}</strong>
                    <span>${item.meta}</span>
                  </button>
                `,
              )
              .join("")
          : `<div class="empty-state">Yeni bildirim yok.</div>`
      }
    </div>
  `;
  document.querySelector(".topbar")?.appendChild(menu);
}

function notify(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(notify.timer);
  notify.timer = setTimeout(() => toast.classList.remove("visible"), 2600);
}

function statusPill(status) {
  const map = {
    approved: ["Onaylı", "green"],
    pending: ["Onay bekliyor", "orange"],
    draft: ["Taslak", "orange"],
    confirmed: ["Onaylandı", "green"],
    pending_payment: ["Ödeme bekliyor", "orange"],
    failed: ["Başarısız", "red"],
    refunded: ["İade edildi", "orange"],
    answered: ["Yanıtlandı", "green"],
  };
  const [label, tone] = map[status] ?? [status, ""];
  return `<span class="status-pill ${tone}">${label}</span>`;
}

function supportStatusPill(status) {
  return status === "answered" ? `<span class="status-pill green">Cevaplandı</span>` : `<span class="status-pill orange">Cevaplanmadı</span>`;
}

function render() {
  updateNav();

  if (state.route === "home") renderHome();
  if (state.route === "detail") renderDetail();
  if (state.route === "auth") renderAuth();
  if (state.route === "bookings") renderBookings();
  if (state.route === "vendor") renderVendor();
  if (state.route === "admin") renderAdmin();
  if (state.route === "favorites") renderFavorites();
  if (state.route === "support") renderSupport();
  if (state.route === "pricing") renderPricing();
}

function renderHome() {
  app.innerHTML = document.querySelector("#homeTemplate").innerHTML;
  const activities = publishedActivities();
  app.querySelector('[data-stat="activityCount"]').textContent = activities.length;
  app.querySelector('[data-stat="sessionCount"]').textContent = activities.reduce((sum, activity) => sum + activity.sessions.length, 0);
  setupFilters();
  renderActivityGrid(activities);
}

function renderAuth() {
  const modeLabel = state.supabaseReady ? "Supabase bağlı" : "Demo mod";

  if (state.currentUser) {
    app.innerHTML = `
      <section class="section-shell">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Üyelik</p>
            <h2>Profil</h2>
            <p class="muted">${modeLabel} · ${state.currentUser.email}</p>
          </div>
          <button class="ghost-action" data-logout>Çıkış yap</button>
        </div>
        <div class="detail-layout">
          <article class="panel">
            ${isAdmin() ? adminProfilePanel() : ""}
            ${isParent() ? parentProfilePanel() : ""}
            ${isVendor() ? vendorProfilePanel() : ""}
          </article>
          <aside class="panel">
            <h3>Panel kısayolları</h3>
            <div class="sessions">
              ${isParent() ? `<button class="ghost-action" data-route="bookings">Rezervasyonlarım</button>` : ""}
              ${isParent() ? `<button class="ghost-action" data-route="favorites">Favoriler</button>` : ""}
              ${isVendor() ? `<button class="ghost-action" data-route="vendor">Satıcı paneli</button>` : ""}
              ${isAdmin() ? `<button class="ghost-action" data-route="admin">Admin paneli</button>` : ""}
            </div>
          </aside>
        </div>
      </section>
    `;
    return;
  }

  app.innerHTML = `
    <section class="section-shell">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Üyelik sistemi</p>
          <h2>Giriş ve üyelik ayrı ilerler</h2>
          <p class="muted">${modeLabel}. Supabase ayarı girildiğinde kayıt/giriş gerçek auth üzerinden yapılır.</p>
          ${state.supabaseConfigError ? `<p class="status-pill red">${state.supabaseConfigError}</p>` : ""}
        </div>
      </div>
      ${authPanel()}
    </section>
  `;
}

function authPanel() {
  if (state.authMode === "login") {
    return `
      <div class="panel auth-panel">
        <div class="panel-heading">
          <div>
            <h3>Giriş yap</h3>
            <p class="muted">Admin paneli sadece ${ADMIN_EMAIL} hesabıyla görünür.</p>
          </div>
          <button class="ghost-action" data-auth-mode="choice">Geri</button>
        </div>
        <form id="loginForm" class="form-grid">
          <label class="wide"><span>E-posta</span><input name="email" type="email" required placeholder="ornek@mail.com" /></label>
          <label class="wide"><span>Şifre</span><input name="password" type="password" required minlength="6" placeholder="En az 6 karakter" /></label>
          <button class="primary-action wide" type="submit">Giriş yap</button>
        </form>
      </div>
    `;
  }

  if (state.authMode === "signup") {
    return `
      <div class="panel auth-panel">
        <div class="panel-heading">
          <div>
            <h3>Üyelik tipi seç</h3>
            <p class="muted">Ebeveyn etkinlik rezervasyonu yapar; firma etkinlik oluşturur ve admin onayı bekler.</p>
          </div>
          <button class="ghost-action" data-auth-mode="choice">Geri</button>
        </div>
        <div class="role-choice-grid">
          <button class="role-choice" data-signup-role="parent">
            <strong>Ebeveyn olarak üye ol</strong>
            <span>Çocuk profili, favoriler ve rezervasyonlar</span>
          </button>
          <button class="role-choice" data-signup-role="vendor">
            <strong>Firma olarak üye ol</strong>
            <span>Satıcı paneli, etkinlik ve seans yönetimi</span>
          </button>
        </div>
      </div>
    `;
  }

  if (state.authMode === "signupForm") {
    const isVendorSignup = state.signupRole === "vendor";
    return `
      <div class="panel auth-panel">
        <div class="panel-heading">
          <div>
            <h3>${isVendorSignup ? "Firma üyeliği" : "Ebeveyn üyeliği"}</h3>
            <p class="muted">${isVendorSignup ? "Firma kaydı pending açılır ve admin onayı bekler." : "Ebeveyn hesabıyla çocuk profili ve rezervasyon oluşturabilirsiniz."}</p>
          </div>
          <button class="ghost-action" data-auth-mode="signup">Geri</button>
        </div>
        <form id="signupForm" class="form-grid">
          <input type="hidden" name="role" value="${state.signupRole}" />
          <label><span>Ad soyad</span><input name="fullName" required placeholder="Adınız Soyadınız" /></label>
          <label><span>E-posta</span><input name="email" type="email" required placeholder="ornek@mail.com" /></label>
          <label class="wide"><span>Şifre</span><input name="password" type="password" required minlength="6" placeholder="En az 6 karakter" /></label>
          ${
            isVendorSignup
              ? `<label class="wide"><span>Firma adı</span><input name="vendorName" required placeholder="Firma / atölye adı" /></label>`
              : ""
          }
          <button class="primary-action wide" type="submit">${isVendorSignup ? "Firma üyeliği oluştur" : "Ebeveyn üyeliği oluştur"}</button>
        </form>
      </div>
    `;
  }

  return `
    <div class="auth-choice-grid">
      <button class="panel auth-choice-card" data-auth-mode="login">
        <strong>Giriş yap</strong>
        <span>Mevcut ebeveyn, firma veya admin hesabıyla devam edin.</span>
      </button>
      <button class="panel auth-choice-card" data-auth-mode="signup">
        <strong>Üye ol</strong>
        <span>Ebeveyn ya da firma hesabı oluşturun.</span>
      </button>
    </div>
  `;
}

function parentProfilePanel() {
  const editingChild = state.children.find((child) => child.id === state.editingChildId);
  return `
    <h3>Çocuk profilleri</h3>
    <div class="sessions">
      ${
        state.children.length
          ? state.children
              .map(
                (child) => `
                  <div class="mini-card child-card">
                    <div>
                      <strong>${child.name}</strong>
                      <p class="muted">${child.age} yaş · ${(child.interests ?? []).join(", ") || "İlgi alanı yok"}</p>
                    </div>
                    <div class="button-row">
                      <button class="ghost-action" data-edit-child="${child.id}">Düzenle</button>
                      <button class="ghost-action danger-action" data-delete-child="${child.id}">Kaldır</button>
                    </div>
                  </div>
                `,
              )
              .join("")
          : `<div class="empty-state">Henüz çocuk profili yok.</div>`
      }
    </div>
    <form id="childForm" class="form-grid">
      <input type="hidden" name="childId" value="${editingChild?.id ?? ""}" />
      <label><span>Çocuk adı</span><input name="name" required placeholder="Ada" value="${editingChild?.name ?? ""}" /></label>
      <label><span>Yaş</span><input name="age" type="number" min="0" max="12" required value="${editingChild?.age ?? 6}" /></label>
      <label class="wide"><span>İlgi alanları</span><input name="interests" placeholder="Sanat, STEM" value="${(editingChild?.interests ?? []).join(", ")}" /></label>
      <div class="wide button-row">
        <button class="ghost-action" type="submit">${editingChild ? "Çocuk profilini güncelle" : "Çocuk profili ekle"}</button>
        ${editingChild ? `<button class="ghost-action" type="button" data-cancel-child-edit>Düzenlemeyi iptal et</button>` : ""}
      </div>
    </form>
  `;
}

function adminProfilePanel() {
  return `
    <h3>Admin profili</h3>
    <div class="mini-card child-card">
      <div class="profile-inline">
        <span class="profile-silhouette" aria-hidden="true">${userInitials()}</span>
        <div>
          <strong>${state.authProfile?.full_name || "Admin"}</strong>
          <p class="muted">${state.currentUser?.email || ADMIN_EMAIL}</p>
        </div>
      </div>
      <button class="ghost-action danger-action" data-logout>Çıkış yap</button>
    </div>
  `;
}

function vendorProfilePanel() {
  const vendor = currentVendor();
  if (!vendor) {
    return `
      <h3>Satıcı profili</h3>
      <div class="empty-state">Firma bağlantısı henüz bulunamadı. Admin onayı veya firma kaydı tamamlandığında satıcı paneli aktif olur.</div>
    `;
  }
  return `
    <h3>Satıcı profili</h3>
    <div class="mini-card">
      <strong>${vendor.name}</strong>
      <p class="muted">${vendor.district} · Free plan · ${statusPill(vendor.status)}</p>
    </div>
    <p class="muted">Yeni satıcı hesapları Supabase'de vendor profili ve pending firma kaydı olarak açılır. Yayına çıkmak için admin onayı gerekir.</p>
  `;
}

function setupFilters() {
  const form = app.querySelector("#filters");
  const lists = {
    category: ["Tümü", ...new Set(state.activities.map((activity) => activity.category))],
    age: ["Tümü", "0-2", "3-4", "5-6", "7-9", "10-12"],
    district: ["Tümü", ...new Set(state.activities.map((activity) => activity.district))],
    type: ["Tümü", ...new Set(state.activities.map((activity) => activity.type))],
  };

  Object.entries(lists).forEach(([name, values]) => {
    form.elements[name].innerHTML = values.map((value) => `<option value="${value}">${value}</option>`).join("");
  });

  form.addEventListener("input", () => {
    app.querySelector("#maxPriceLabel").textContent = money(Number(form.elements.maxPrice.value));
    renderActivityGrid(filterActivities(new FormData(form)));
  });

  app.querySelector("#resetFilters").addEventListener("click", () => {
    form.reset();
    form.elements.maxPrice.value = 10000;
    app.querySelector("#maxPriceLabel").textContent = money(10000);
    renderActivityGrid(publishedActivities());
  });
}

function filterActivities(formData) {
  const query = String(formData.get("query") || "").toLocaleLowerCase("tr-TR");
  const category = formData.get("category");
  const age = formData.get("age");
  const district = formData.get("district");
  const type = formData.get("type");
  const maxPrice = Number(formData.get("maxPrice"));

  return publishedActivities().filter((activity) => {
    const inAge =
      age === "Tümü" ||
      (() => {
        const [min, max] = age.split("-").map(Number);
        return activity.minAge <= max && activity.maxAge >= min;
      })();
    const inQuery =
      !query ||
      [activity.title, activity.description, activity.category, getVendor(activity.vendorId).name]
        .join(" ")
        .toLocaleLowerCase("tr-TR")
        .includes(query);
    return (
      inQuery &&
      (category === "Tümü" || activity.category === category) &&
      (district === "Tümü" || activity.district === district) &&
      (type === "Tümü" || activity.type === type) &&
      inAge &&
      activity.price <= maxPrice
    );
  });
}

function renderActivityGrid(activities) {
  const grid = app.querySelector("#activityGrid");
  if (!activities.length) {
    grid.innerHTML = `<div class="empty-state">Bu filtrelerle yayınlanan etkinlik bulunamadı.</div>`;
    return;
  }

  grid.innerHTML = activities
    .map((activity) => {
      const vendor = getVendor(activity.vendorId);
      return `
        <article class="activity-card">
          <div class="activity-visual" style="${activity.imageUrl ? `--image:url('${activity.imageUrl}')` : `--visual:${activity.visual}`}">
            <strong>${activity.category}</strong>
          </div>
          <div class="activity-body">
            <div class="tag-row">
              <span class="tag">${activity.minAge}-${activity.maxAge} yaş</span>
              <span class="tag">${activity.district}</span>
              ${activity.address ? `<span class="tag">Konumlu</span>` : ""}
              <span class="tag">${activity.participationType === "private" ? "Bire bir" : "Toplu"}</span>
              <span class="tag">${remainingLabel(activity)}</span>
            </div>
            <h3>${activity.title}</h3>
            <p class="muted">${vendor.name} · ${activity.type}</p>
            <div class="card-footer">
              <span class="price">${money(activity.price)}</span>
              <div class="button-row">
                ${isParent() ? `<button class="icon-button ${state.favorites.has(activity.id) ? "active" : ""}" data-favorite="${activity.id}" title="Favori">♥</button>` : ""}
                <button class="primary-action" data-detail="${activity.id}">Detay</button>
              </div>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderDetail() {
  const activity = state.activities.find((item) => item.id === state.selectedActivityId) ?? publishedActivities()[0];
  const vendor = getVendor(activity.vendorId);
  const firstAvailable = activity.sessions.find((session) => session.capacity > session.reserved);
  const canBook = isParent() && !isVendor() && !isAdmin();
  app.innerHTML = `
    <section class="section-shell">
      <button class="ghost-action" data-route="home">← Listeye dön</button>
      <div class="detail-header">
        <div>
          <p class="eyebrow">${activity.category}</p>
          <h2>${activity.title}</h2>
          <p class="muted">${vendor.name} · ${activity.district} · ${activity.minAge}-${activity.maxAge} yaş</p>
        </div>
        <div class="button-row">
          ${statusPill(activity.status)}
          ${isAdmin() && activity.status === "pending" ? `<button class="primary-action" data-approve-activity="${activity.id}">Etkinliği onayla</button>` : ""}
        </div>
      </div>
      <div class="detail-layout">
        <article class="panel">
          <div class="detail-cover" style="${activity.imageUrl ? `--image:url('${activity.imageUrl}')` : `--visual:${activity.visual}`}"></div>
          <h3>Etkinlik bilgileri</h3>
          <p>${activity.description}</p>
          <div class="tag-row">
            <span class="tag">${activity.type}</span>
            <span class="tag">${activity.participationType === "private" ? "Bire bir etkinlik" : "Toplu etkinlik"}</span>
            <span class="tag">${favoriteCount(activity.id)} favori</span>
            <span class="tag">${remainingLabel(activity)}</span>
            ${activity.address ? `<span class="tag">${activity.address}</span>` : ""}
            <span class="tag">${activity.parentParticipation}</span>
            <span class="tag">${activity.cancellation}</span>
          </div>
          <h3>Konum</h3>
          <div class="map-frame">
            <iframe title="${activity.title} konumu" src="${mapEmbedUrl(activity)}" loading="lazy"></iframe>
          </div>
          <a class="ghost-action map-link" href="${googleMapsSearchUrl(activity)}" target="_blank" rel="noreferrer">Google Maps'te aç</a>
          ${
            activity.galleryImages?.length
              ? `
                <h3>Geçmiş etkinlik fotoğrafları</h3>
                <div class="photo-carousel">
                  ${activity.galleryImages.map((url, index) => `<img src="${url}" alt="${activity.title} geçmiş etkinlik fotoğrafı ${index + 1}" />`).join("")}
                </div>
              `
              : ""
          }
          <h3>Seanslar</h3>
          <div class="sessions">
            ${activity.sessions
              .map((session) => {
                const remaining = session.capacity - session.reserved;
                return `
                  <div class="session-row">
                    <span>
                      <strong>${dateTime(session.start)}</strong>
                      <span class="muted">${activity.participationType === "private" ? (remaining > 0 ? "Bire bir uygun" : "Bire bir dolu") : `${remaining} kişilik yer kaldı`} · Maks. ${session.capacity} kişi · ${money(session.price)}</span>
                    </span>
                    <span class="price">${money(session.price)}</span>
                  </div>
                `;
              })
              .join("")}
          </div>
        </article>
        ${canBook ? `<aside class="panel">
          <p class="eyebrow">Rezervasyon</p>
          <h3>Seans, çocuk ve ödeme bilgisi</h3>
          <form id="bookingForm" class="form-grid">
            <fieldset class="wide option-group">
              <legend>Seans seç</legend>
              ${activity.sessions
                .map((session) => {
                  const remaining = session.capacity - session.reserved;
                  return `
                    <label class="session-row ${session.id === firstAvailable?.id ? "selected" : ""}">
                      <span>
                        <strong>${dateTime(session.start)}</strong>
                        <span class="muted">${remaining > 0 ? `${remaining} kişilik yer kaldı` : "Kontenjan dolu"} · Kişi başı ${money(session.price)}</span>
                      </span>
                      <input type="radio" name="session" value="${session.id}" data-session-price="${session.price}" ${session.id === firstAvailable?.id ? "checked" : ""} ${remaining <= 0 ? "disabled" : ""} />
                    </label>
                  `;
                })
                .join("")}
            </fieldset>
            <fieldset class="wide option-group">
              <legend>Katılımcı çocuklar</legend>
              ${
                state.children.length
                  ? state.children.map((child, index) => `<label class="check-row"><input type="checkbox" name="children" value="${child.id}" ${index === 0 ? "checked" : ""} /> <span>${child.name}, ${child.age} yaş</span></label>`).join("")
                  : `<div class="empty-state">Rezervasyon için önce profilinizden çocuk ekleyin.</div>`
              }
            </fieldset>
            <label class="wide">
              Ödeme yöntemi
              <select name="paymentMethod">
                <option value="online">Online ödeme - dummy POS</option>
                <option value="onsite">Yerinde ödeme feature flag</option>
              </select>
            </label>
            <label class="wide">
              Not
              <textarea name="notes" placeholder="Alerji, sağlık notu veya satıcıya iletilecek bilgi"></textarea>
            </label>
            <div class="booking-total wide">
              <span>Toplam</span>
              <strong data-booking-total>${money((firstAvailable?.price || activity.price) * Math.max(1, state.children.length ? 1 : 0))}</strong>
            </div>
            <button class="primary-action wide" type="submit" ${state.children.length ? "" : "disabled"}>Rezervasyon oluştur</button>
          </form>
          <p class="muted">Başarılı online ödeme confirmed rezervasyon üretir; komisyon kaydı otomatik hesaplanır.</p>
        </aside>` : ""}
      </div>
    </section>
  `;
}

async function createBooking(form) {
  if (!state.currentUser) {
    notify("Rezervasyon için önce ebeveyn hesabıyla giriş yapın.");
    state.route = "auth";
    render();
    return;
  }
  if (!isParent()) {
    notify("Rezervasyon akışı ebeveyn hesabı içindir.");
    return;
  }
  const sessionId = form.querySelector('input[name="session"]:checked')?.value;
  if (!sessionId) {
    notify("Uygun bir seans seçilmedi.");
    return;
  }
  const found = getSession(sessionId);
  if (!found) {
    notify("Seans bulunamadı. Sayfayı yenileyip tekrar deneyin.");
    return;
  }
  const { activity, session } = found;
  const formData = new FormData(form);
  const childIds = formData.getAll("children").map(String);
  const participantCount = childIds.length;
  if (!participantCount) {
    notify("En az bir çocuk seçin.");
    return;
  }
  const remaining = session.capacity - session.reserved;
  if (participantCount > remaining) {
    notify(`Bu seans için sadece ${remaining} kişilik yer kaldı.`);
    return;
  }
  if (session.reserved >= session.capacity) {
    notify("Bu seans için kontenjan kalmadı.");
    return;
  }
  const vendor = getVendor(activity.vendorId);
  const paymentMethod = formData.get("paymentMethod");
  const status = paymentMethod === "online" ? "confirmed" : "confirmed";
  const totalAmount = session.price * participantCount;
  session.reserved += participantCount;
  const booking = {
    id: `book-${Date.now()}`,
    activityId: activity.id,
    sessionId,
    childId: childIds[0],
    childIds,
    status,
    paymentProvider: paymentMethod === "online" ? "DummyPOS" : "Yerinde ödeme",
    totalAmount,
    commissionRate: vendor.commissionRate,
    commissionAmount: Math.round(totalAmount * vendor.commissionRate),
    createdAt: new Date().toISOString(),
    notes: formData.get("notes"),
  };
  state.bookings.unshift(booking);

  if (state.supabaseReady && state.currentUser && isUuid(sessionId)) {
    const { data: insertedBooking, error } = await state.supabaseClient.from("bookings").insert({
      user_id: state.currentUser.id,
      session_id: sessionId,
      status: status,
      participant_count: participantCount,
      total_amount: totalAmount,
    }).select("id").single();
    if (error) notify(`Demo rezervasyon oluştu; Supabase kaydı için backend RPC gerekir: ${error.message}`);
    if (insertedBooking?.id) {
      const participants = childIds
        .filter(isUuid)
        .map((childId) => ({ booking_id: insertedBooking.id, child_id: childId }));
      if (participants.length) await state.supabaseClient.from("booking_participants").insert(participants);
    }
  }

  notify("Rezervasyon onaylandı, komisyon kaydı oluşturuldu.");
  setRoute("bookings");
}

function updateBookingEstimate(form = document.querySelector("#bookingForm")) {
  if (!form) return;
  const selectedSession = form.querySelector('input[name="session"]:checked');
  const childCount = form.querySelectorAll('input[name="children"]:checked').length;
  const price = Number(selectedSession?.dataset.sessionPrice || 0);
  const total = price * childCount;
  const totalNode = form.querySelector("[data-booking-total]");
  if (totalNode) totalNode.textContent = money(total);
  form.querySelectorAll(".session-row").forEach((row) => {
    row.classList.toggle("selected", row.contains(selectedSession));
  });
}

function updateSessionDuration(row) {
  const date = row.querySelector('input[name="sessionDate"]')?.value || "2026-06-10";
  const start = row.querySelector('input[name="sessionStartTime"]')?.value;
  const end = row.querySelector('input[name="sessionEndTime"]')?.value;
  const durationInput = row.querySelector('input[name="sessionDuration"]');
  if (!start || !end || !durationInput) return;
  const minutes = durationMinutes(`${date}T${start}:00`, `${date}T${end}:00`);
  durationInput.value = minutes;
}

function addSessionEditor() {
  const container = document.querySelector("#activitySessions");
  const addButton = container?.querySelector("[data-add-session]");
  if (!container || !addButton) return;
  addButton.insertAdjacentHTML("beforebegin", sessionEditorRow({}, container.querySelectorAll("[data-session-editor]").length));
}

function renderBookings() {
  if (!state.currentUser || (!isParent() && !isAdmin())) {
    renderAccessGate("Ebeveyn hesabı gerekli", "Rezervasyonlarım ve favoriler alanı ebeveyn hesabıyla görüntülenir.");
    return;
  }
  app.innerHTML = `
    <section class="section-shell">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Ebeveyn hesabı</p>
          <h2>Rezervasyonlarım ve favoriler</h2>
        </div>
        <button class="primary-action" data-route="home">Yeni etkinlik bul</button>
      </div>
      <div class="detail-layout">
        <div class="panel">
          <h3>Rezervasyonlar</h3>
          <div class="sessions">
            ${
              state.bookings.length
                ? state.bookings.map(bookingCard).join("")
                : `<div class="empty-state">Henüz rezervasyon yok. Keşfet ekranından bir seans seçebilirsiniz.</div>`
            }
          </div>
        </div>
        <aside class="panel">
          <h3>Favoriler</h3>
          <div class="sessions">
            ${
              [...state.favorites]
                .map((id) => state.activities.find((activity) => activity.id === id))
                .filter(Boolean)
                .map(
                  (activity) => `
                    <div class="mini-card">
                      <strong>${activity.title}</strong>
                      <p class="muted">${activity.category} · ${activity.district}</p>
                      <button class="ghost-action" data-detail="${activity.id}">Detay</button>
                    </div>
                  `,
                )
                .join("") || `<div class="empty-state">Favori listeniz boş.</div>`
            }
          </div>
        </aside>
      </div>
    </section>
  `;
}

function bookingCard(booking) {
  const { activity, session } = getSession(booking.sessionId);
  const childIds = booking.childIds?.length ? booking.childIds : [booking.childId].filter(Boolean);
  const childNames = booking.childNames?.length
    ? booking.childNames
    : childIds.map((id) => state.children.find((item) => item.id === id)?.name).filter(Boolean);
  return `
    <article class="booking-card">
      <div class="panel-heading">
        <div>
          <h3>${activity.title}</h3>
          <p class="muted">${dateTime(session.start)} · ${childNames.join(", ") || `${childIds.length || 1} katılımcı`}</p>
        </div>
        ${statusPill(booking.status)}
      </div>
      <div class="tag-row">
        <span class="tag">Ödeme: ${booking.paymentProvider}</span>
        <span class="tag">Katılımcı: ${childIds.length || 1}</span>
        <span class="tag">Tutar: ${money(booking.totalAmount)}</span>
      </div>
    </article>
  `;
}

function bookingParticipantSummary(booking) {
  const childIds = booking.childIds?.length ? booking.childIds : [booking.childId].filter(Boolean);
  const childNames = booking.childNames?.length
    ? booking.childNames
    : childIds.map((id) => state.children.find((item) => item.id === id)?.name).filter(Boolean);
  return childNames.join(", ") || `${childIds.length || 1} katılımcı`;
}

function renderVendor() {
  if (!state.currentUser || (!isVendor() && !isAdmin())) {
    renderAccessGate("Satıcı hesabı gerekli", "Satıcı paneli firma hesabıyla giriş yapan kullanıcılar içindir. Yeni satıcı hesabı açıldığında firma pending statüsünde admin onayı bekler.", "Satıcı girişi / kayıt");
    return;
  }
  const vendor = currentVendor();
  if (!vendor) {
    renderAccessGate("Firma bağlantısı bulunamadı", "Bu satıcı hesabına bağlı firma kaydı bulunamadı. Firma üyeliğini tamamlayın veya admin onayını kontrol edin.", "Profil");
    return;
  }
  const vendorActivities = state.activities.filter((activity) => activity.vendorId === vendor.id);
  const bookings = state.bookings.filter((booking) => vendorActivities.some((activity) => activity.id === booking.activityId));
  app.innerHTML = `
    <section class="dashboard-shell">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Satıcı paneli</p>
          <h2>${vendor.name}</h2>
          <p class="muted">Free plan · satış başı %${Math.round(vendor.commissionRate * 100)} komisyon</p>
        </div>
        ${statusPill(vendor.status)}
      </div>
      <div class="dashboard-layout">
        <nav class="side-tabs">
          ${["overview", "activities", "calendar", "bookings", "revenue", "new"].map((tab) => `<button class="tab-button ${state.vendorTab === tab ? "active" : ""}" data-vendor-tab="${tab}">${vendorTabLabel(tab)}</button>`).join("")}
        </nav>
        <div>${vendorPanel(vendor, vendorActivities, bookings)}</div>
      </div>
    </section>
  `;
}

function vendorTabLabel(tab) {
  return {
    overview: "Dashboard",
    activities: "Etkinliklerim",
    calendar: "Takvim",
    bookings: "Rezervasyonlar",
    revenue: "Gelirler",
    new: "Yeni etkinlik",
  }[tab];
}

function vendorPanel(vendor, activities, bookings) {
  const gross = bookings.reduce((sum, booking) => sum + booking.totalAmount, 0);
  const commission = bookings.reduce((sum, booking) => sum + booking.commissionAmount, 0);
  if (state.vendorTab === "overview") {
    return `
      <div class="metrics-grid">
        <div class="metric-card"><span>Toplam satış</span><strong>${money(gross)}</strong></div>
        <div class="metric-card"><span>Komisyon</span><strong>${money(commission)}</strong></div>
        <div class="metric-card"><span>Net hak ediş</span><strong>${money(gross - commission)}</strong></div>
        <div class="metric-card"><span>Rezervasyon</span><strong>${bookings.length}</strong></div>
      </div>
      <div class="panel">
        <h3>Bugünün operasyon özeti</h3>
        <p class="muted">Takvim, rezervasyon ve gelir ekranları aynı veri modelinden beslenir. Yeni rezervasyonlar anlık olarak bu panelde görünür.</p>
      </div>
    `;
  }
  if (state.vendorTab === "activities") return activityTable(activities);
  if (state.vendorTab === "calendar") return calendarPanel(activities);
  if (state.vendorTab === "bookings") return bookingTable(bookings);
  if (state.vendorTab === "revenue") return revenuePanel(bookings);
  return newActivityForm(vendor);
}

function activityTable(activities) {
  return `
    <div class="panel">
      <div class="panel-heading">
        <h3>Etkinliklerim</h3>
        <button class="primary-action" data-new-activity>Yeni etkinlik</button>
      </div>
      <div class="vendor-activity-grid">
        ${
          activities.length
            ? activities.map((activity) => {
            const firstSession = activity.sessions[0];
            return `
              <article class="vendor-activity-card">
                <div class="vendor-activity-thumb" style="${activity.imageUrl ? `--image:url('${activity.imageUrl}')` : `--visual:${activity.visual}`}"></div>
                <div class="vendor-activity-content">
                  <div class="panel-heading">
                    <div>
                      <h3>${activity.title}</h3>
                      <p class="muted">${activity.category} · ${activity.minAge}-${activity.maxAge} yaş</p>
                    </div>
                    ${statusPill(activity.status)}
                  </div>
                  <div class="tag-row">
                    <span class="tag">${activity.participationType === "private" ? "Bire bir" : "Toplu"}</span>
                    <span class="tag">${remainingLabel(activity)}</span>
                    <span class="tag">${favoriteCount(activity.id)} favori</span>
                    <span class="tag">${activity.district}</span>
                    ${firstSession ? `<span class="tag">${dateTime(firstSession.start)} · ${durationMinutes(firstSession.start, firstSession.end)} dk</span>` : ""}
                  </div>
                  <p class="muted">${activity.address || activity.locationQuery || "Mekan bilgisi yok"}</p>
                </div>
                <div class="button-row">
                  <button class="ghost-action" data-edit-activity="${activity.id}">Düzenle</button>
                  <button class="ghost-action danger-action" data-delete-activity="${activity.id}">Kaldır</button>
                </div>
              </article>
            `;
          }).join("")
            : `<div class="empty-state">Henüz etkinlik yok.</div>`
        }
      </div>
    </div>
  `;
}

function calendarPanel(activities) {
  const sessions = activities.flatMap((activity) => activity.sessions.map((session) => ({ activity, session })));
  const days = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];
  return `
    <div class="panel">
      <div class="panel-heading">
        <h3>Haftalık takvim</h3>
        <span class="tag">Gün / hafta / ay altyapısı</span>
      </div>
      <div class="calendar-grid">
        ${days
          .map(
            (day, index) => `
              <div class="calendar-day">
                <strong>${day}</strong>
                ${sessions
                  .filter((item) => (new Date(item.session.start).getDay() + 6) % 7 === index)
                  .map((item) => `<div class="calendar-event">${item.activity.title}<br>${dateTime(item.session.start).split(" ").slice(-1)}</div>`)
                  .join("")}
              </div>
            `,
          )
          .join("")}
      </div>
    </div>
  `;
}

function bookingTable(bookings) {
  return `
    <div class="panel">
      <h3>Satılan etkinlikler</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Etkinlik</th><th>Seans</th><th>Satın alan</th><th>Katılımcı çocuk</th><th>Tutar</th><th>Durum</th><th>Detay</th></tr></thead>
          <tbody>${
            bookings.length
              ? bookings.map((booking) => {
                  const { activity, session } = getSession(booking.sessionId);
                  return `<tr><td>${activity.title}</td><td>${dateTime(session.start)}</td><td>${booking.buyerName || booking.buyerEmail || "-"}</td><td>${bookingParticipantSummary(booking)}</td><td>${money(booking.totalAmount)}</td><td>${statusPill(booking.status)}</td><td><button class="ghost-action" data-detail="${activity.id}">Etkinlik</button></td></tr>`;
                }).join("")
              : `<tr><td colspan="7">Henüz rezervasyon yok.</td></tr>`
          }</tbody>
        </table>
      </div>
    </div>
  `;
}

function revenuePanel(bookings) {
  const gross = bookings.reduce((sum, booking) => sum + booking.totalAmount, 0);
  const commission = bookings.reduce((sum, booking) => sum + booking.commissionAmount, 0);
  return `
    <div class="panel">
      <h3>Gelir özeti</h3>
      <div class="metrics-grid">
        <div class="metric-card"><span>Brüt satış</span><strong>${money(gross)}</strong></div>
        <div class="metric-card"><span>Platform komisyonu</span><strong>${money(commission)}</strong></div>
        <div class="metric-card"><span>Net hak ediş</span><strong>${money(gross - commission)}</strong></div>
        <div class="metric-card"><span>İade</span><strong>${money(0)}</strong></div>
      </div>
      <form class="form-grid">
        <label><span>Gider başlığı</span><input placeholder="Malzeme alımı" /></label>
        <label><span>Tutar</span><input type="number" placeholder="1500" /></label>
        <label class="wide"><span>Açıklama</span><textarea placeholder="Manuel gider girişi MVP alanı"></textarea></label>
        <button class="ghost-action wide" type="button" data-notify="Gider kaydı demo olarak eklendi.">Gider ekle</button>
      </form>
    </div>
  `;
}

function newActivityForm(vendor) {
  const editingActivity = state.activities.find((activity) => activity.id === state.editingActivityId);
  const sessions = editingActivity?.sessions?.length
    ? editingActivity.sessions
    : [{ start: "2026-06-10T13:00:00", end: "2026-06-10T15:00:00", capacity: 8, price: editingActivity?.price ?? 600 }];

  return `
    <div class="panel">
      <div class="panel-heading">
        <div>
          <h3>${editingActivity ? "Etkinliği düzenle" : "Etkinlik oluştur"}</h3>
          <p class="muted">Yer, zaman, süre, konum ve fotoğraf bilgileri public detay sayfasında görünür.</p>
        </div>
        ${editingActivity ? `<button class="ghost-action" data-cancel-activity-edit>Düzenlemeyi iptal et</button>` : ""}
      </div>
      <form id="activityForm" class="form-grid">
        <input type="hidden" name="activityId" value="${editingActivity?.id ?? ""}" />
        <input type="hidden" name="currentImageUrl" value="${editingActivity?.imageUrl ?? ""}" />
        <input type="hidden" name="currentGalleryImages" value="${(editingActivity?.galleryImages ?? []).join("|")}" />
        <label><span>Başlık</span><input name="title" required placeholder="Yaratıcı drama atölyesi" value="${editingActivity?.title ?? ""}" /></label>
        <label><span>Kategori</span><select name="category">${["Oyun grubu", "Sanat atölyesi", "Spor", "Müzik", "Dans", "Drama", "Müze/gezi", "Bilim/STEM", "Doğa"].map((item) => `<option ${editingActivity?.category === item ? "selected" : ""}>${item}</option>`).join("")}</select></label>
        <label><span>Katılım tipi</span><select name="participationType"><option value="group" ${editingActivity?.participationType !== "private" ? "selected" : ""}>Toplu etkinlik</option><option value="private" ${editingActivity?.participationType === "private" ? "selected" : ""}>Bire bir etkinlik</option></select></label>
        <label><span>Min yaş</span><input name="minAge" type="number" min="0" max="12" value="${editingActivity?.minAge ?? 5}" /></label>
        <label><span>Max yaş</span><input name="maxAge" type="number" min="0" max="12" value="${editingActivity?.maxAge ?? 8}" /></label>
        <label><span>İlçe</span><input name="district" value="${editingActivity?.district ?? vendor.district}" /></label>
        <label><span>Mekan / işletme adı</span><input name="locationQuery" required value="${editingActivity?.locationQuery ?? editingActivity?.address ?? ""}" placeholder="Örn. Pera Müzesi, Beyoğlu" /></label>
        <label class="wide"><span>Adres notu</span><input name="address" value="${editingActivity?.address ?? ""}" placeholder="Kat, salon, buluşma noktası gibi ek bilgi" /></label>
        <fieldset class="wide option-group" id="activitySessions">
          <legend>Seanslar</legend>
          ${sessions.map((session, index) => sessionEditorRow(session, index)).join("")}
          <button class="ghost-action" type="button" data-add-session>Seans ekle</button>
        </fieldset>
        <label class="wide"><span>Ana etkinlik görseli / thumbnail</span><input name="image" type="file" accept="image/*" data-preview-target="coverPreview" /></label>
        <div class="wide media-grid" id="coverPreview">
          ${
            editingActivity?.imageUrl
              ? `<div class="media-thumb"><img src="${editingActivity.imageUrl}" alt="${editingActivity.title} kapak görseli" /><button type="button" data-remove-cover>Kapak görselini kaldır</button></div>`
              : ""
          }
        </div>
        <label class="wide"><span>Geçmiş etkinlik fotoğrafları</span><input name="galleryImages" type="file" accept="image/*" multiple data-preview-target="galleryPreview" /></label>
        ${
          editingActivity?.galleryImages?.length
            ? `<div class="wide media-grid">${editingActivity.galleryImages.map((url, index) => `<div class="media-thumb"><img src="${url}" alt="${editingActivity.title} galeri ${index + 1}" /><button type="button" data-remove-gallery-image="${encodeURIComponent(url)}">Kaldır</button></div>`).join("")}</div>`
            : ""
        }
        <div class="wide media-grid" id="galleryPreview"></div>
        <label class="wide"><span>Açıklama</span><textarea name="description" required>${editingActivity?.description ?? ""}</textarea></label>
        <div class="wide map-frame compact-map">
          <iframe title="Etkinlik konum önizlemesi" src="${mapEmbedUrl(editingActivity ?? { locationQuery: "İstanbul" })}" loading="lazy"></iframe>
        </div>
        <button class="ghost-action wide map-link" type="button" data-open-map-search>Mekan adını Google Maps'te kontrol et</button>
        <button class="primary-action wide" type="submit">${editingActivity ? "Etkinliği güncelle" : "Pending etkinlik oluştur"}</button>
      </form>
    </div>
  `;
}

function sessionEditorRow(session = {}, index = 0) {
  const date = dateOnly(session.start) || "2026-06-10";
  const startTime = timeOnly(session.start) || "13:00";
  const endTime = timeOnly(session.end) || "15:00";
  const duration = session.start && session.end ? durationMinutes(session.start, session.end) : 120;
  return `
    <div class="session-editor" data-session-editor>
      <input type="hidden" name="sessionId" value="${session.id ?? ""}" />
      <label><span>Tarih</span><input name="sessionDate" type="date" value="${date}" required /></label>
      <label><span>Başlangıç</span><input name="sessionStartTime" type="time" value="${startTime}" required data-session-time /></label>
      <label><span>Bitiş</span><input name="sessionEndTime" type="time" value="${endTime}" required data-session-time /></label>
      <label><span>Süre (dk)</span><input name="sessionDuration" type="number" min="30" step="15" value="${duration}" required readonly /></label>
      <label><span>Kişi sayısı</span><input name="sessionCapacity" type="number" min="1" value="${session.capacity ?? 8}" /></label>
      <label><span>Fiyat</span><input name="sessionPrice" type="number" min="0" value="${session.price ?? 600}" /></label>
      ${index > 0 ? `<button class="ghost-action danger-action" type="button" data-remove-session>Seansı kaldır</button>` : ""}
    </div>
  `;
}

function slugify(value) {
  return String(value)
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function createActivity(form) {
  const data = new FormData(form);
  const activityId = String(data.get("activityId") || "");
  const existingActivity = state.activities.find((activity) => activity.id === activityId);
  const imageFile = form.elements.image?.files?.[0];
  const galleryFiles = form.elements.galleryImages?.files;
  let imageUrl = String(data.get("currentImageUrl") || "");
  let galleryImages = String(data.get("currentGalleryImages") || "")
    .split("|")
    .filter(Boolean);
  if (imageFile && !state.supabaseReady) imageUrl = await fileToDataUrl(imageFile);
  if (galleryFiles?.length && !state.supabaseReady) {
    const localGallery = [];
    for (const file of Array.from(galleryFiles)) localGallery.push(await fileToDataUrl(file));
    galleryImages = [...galleryImages, ...localGallery];
  }
  const participationType = String(data.get("participationType") || "group");
  const locationQuery = String(data.get("locationQuery") || "").trim();
  const sessionIds = data.getAll("sessionId").map(String);
  const sessionDates = data.getAll("sessionDate").map(String);
  const sessionStarts = data.getAll("sessionStartTime").map(String);
  const sessionEnds = data.getAll("sessionEndTime").map(String);
  const sessionCapacities = data.getAll("sessionCapacity").map(Number);
  const sessionPrices = data.getAll("sessionPrice").map(Number);
  const sessions = sessionDates.map((date, index) => {
    const startAt = `${date}T${sessionStarts[index] || "13:00"}:00`;
    const endAt = `${date}T${sessionEnds[index] || "15:00"}:00`;
    const existingSession = existingActivity?.sessions?.[index];
    return {
      id: sessionIds[index] || existingSession?.id || `ses-${Date.now()}-${index}`,
      start: startAt,
      end: endAt,
      capacity: participationType === "private" ? 1 : Math.max(1, sessionCapacities[index] || 8),
      reserved: existingSession?.reserved ?? 0,
      price: Math.max(0, sessionPrices[index] || 0),
      status: "active",
    };
  });
  const firstSession = sessions[0];
  const activity = {
    id: activityId || `act-${Date.now()}`,
    vendorId: existingActivity?.vendorId ?? "ven-1",
    title: data.get("title"),
    category: data.get("category"),
    type: sessions.length > 1 ? "Çoklu seans" : "Tek seans",
    participationType,
    minAge: Number(data.get("minAge")),
    maxAge: Number(data.get("maxAge")),
    district: data.get("district"),
    address: data.get("address"),
    locationQuery,
    lat: existingActivity?.lat ?? null,
    lng: existingActivity?.lng ?? null,
    price: Number(firstSession?.price ?? 0),
    status: "pending",
    visual: existingActivity?.visual ?? "linear-gradient(135deg, #0f766e, #2563eb 55%, #e85d45)",
    imageUrl,
    galleryImages,
    description: data.get("description"),
    cancellation: "Etkinlikten 24 saat öncesine kadar ücretsiz iptal.",
    parentParticipation: "Satıcı tarafından belirlenecek.",
    sessions,
  };

  if (activityId) {
    state.activities = state.activities.map((item) => (item.id === activityId ? activity : item));
  } else {
    state.activities.unshift(activity);
  }

  state.vendorTab = "activities";
  state.editingActivityId = null;
  notify(activityId ? "Etkinlik güncellemesi kaydediliyor..." : "Etkinlik oluşturuluyor...");
  renderVendor();

  if (state.supabaseReady && state.currentUser) {
    const { data: vendorLink } = await state.supabaseClient
      .from("vendor_users")
      .select("vendor_id")
      .eq("user_id", state.currentUser.id)
      .maybeSingle();

    const vendorId = vendorLink?.vendor_id;
    const { data: category } = await state.supabaseClient
      .from("categories")
      .select("id")
      .eq("name", data.get("category"))
      .maybeSingle();

    if (vendorId) {
      if (imageFile) {
        try {
          imageUrl = await uploadActivityImage(imageFile, vendorId);
          activity.imageUrl = imageUrl;
          state.activities = state.activities.map((item) => (item.id === activity.id ? activity : item));
        } catch (error) {
          notify(`Fotoğraf Storage'a yüklenemedi: ${error.message}`);
        }
      }
      if (galleryFiles?.length) {
        try {
          const uploadedGallery = await uploadActivityImages(galleryFiles, vendorId);
          galleryImages = [...galleryImages, ...uploadedGallery];
          activity.galleryImages = galleryImages;
          state.activities = state.activities.map((item) => (item.id === activity.id ? activity : item));
        } catch (error) {
          notify(`Galeri fotoğrafları yüklenemedi: ${error.message}`);
        }
      }

      const activityPayload = {
        vendor_id: vendorId,
        category_id: category?.id ?? null,
        title: data.get("title"),
        slug: `${slugify(data.get("title"))}-${Date.now()}`,
        description: data.get("description"),
        min_age: Number(data.get("minAge")),
        max_age: Number(data.get("maxAge")),
        activity_type: sessions.length > 1 ? "Çoklu seans" : "Tek seans",
        participation_type: participationType,
        district: data.get("district"),
        address: data.get("address"),
        location_query: locationQuery,
        image_url: imageUrl,
        gallery_image_urls: galleryImages,
        status: "pending",
      };

      const activityRequest =
        activityId && !String(activityId).startsWith("act-")
          ? state.supabaseClient.from("activities").update(activityPayload).eq("id", activityId).select().single()
          : state.supabaseClient.from("activities").insert(activityPayload).select().single();

      const { data: dbActivity, error } = await activityRequest;

      if (!error && dbActivity) {
        for (const [index, sessionItem] of sessions.entries()) {
          const sessionPayload = {
            activity_id: dbActivity.id,
            start_at: `${sessionItem.start}+03:00`,
            end_at: `${sessionItem.end}+03:00`,
            capacity: sessionItem.capacity,
            price: sessionItem.price,
            status: "active",
          };
          const existingSessionId = sessionIds[index] || existingActivity?.sessions?.[index]?.id;
          if (activityId && existingSessionId && !String(existingSessionId).startsWith("ses-")) {
            await state.supabaseClient.from("activity_sessions").update(sessionPayload).eq("id", existingSessionId);
          } else {
            await state.supabaseClient.from("activity_sessions").insert({ ...sessionPayload, reserved_count: 0 });
          }
        }
      }

      if (error) notify(`Yerel etkinlik oluştu; Supabase kaydı başarısız: ${error.message}`);
      await loadMarketplaceData();
    }
  }

  notify(activityId ? "Etkinlik güncellendi ve tekrar admin onayına alındı." : "Etkinlik pending durumunda oluşturuldu; admin onayı bekliyor.");
  renderVendor();
}

async function deleteActivity(activityId) {
  const activity = state.activities.find((item) => item.id === activityId);
  if (!activity) return;

  state.activities = state.activities.filter((item) => item.id !== activityId);
  if (state.editingActivityId === activityId) state.editingActivityId = null;

  if (state.supabaseReady && !String(activityId).startsWith("act-")) {
    const { error } = await state.supabaseClient.from("activities").delete().eq("id", activityId);
    if (error) notify(`Yerel olarak kaldırıldı; Supabase silme başarısız: ${error.message}`);
  }

  notify("Etkinlik kaldırıldı.");
  renderVendor();
}

function removeGalleryImage(encodedUrl) {
  const activity = state.activities.find((item) => item.id === state.editingActivityId);
  if (!activity) return;
  const url = decodeURIComponent(encodedUrl);
  activity.galleryImages = (activity.galleryImages ?? []).filter((item) => item !== url);
  renderVendor();
}

function removeCoverImage() {
  const activity = state.activities.find((item) => item.id === state.editingActivityId);
  if (!activity) return;
  activity.imageUrl = "";
  renderVendor();
}

function previewSelectedImages(input) {
  const targetId = input.dataset.previewTarget;
  const target = targetId ? document.querySelector(`#${targetId}`) : null;
  if (!target) return;

  target.innerHTML = "";
  Array.from(input.files || []).forEach((file) => {
    const index = Array.from(input.files || []).indexOf(file);
    const reader = new FileReader();
    reader.onload = () => {
      const item = document.createElement("div");
      item.className = "media-thumb";
      item.innerHTML = `<img src="${reader.result}" alt="${file.name}" /><button type="button" data-remove-selected-file="${input.name}" data-file-index="${index}">Seçimi kaldır</button>`;
      target.appendChild(item);
    };
    reader.readAsDataURL(file);
  });
}

function removeSelectedFile(inputName, index) {
  const input = document.querySelector(`input[type="file"][name="${inputName}"]`);
  if (!input?.files) return;

  const transfer = new DataTransfer();
  Array.from(input.files).forEach((file, fileIndex) => {
    if (fileIndex !== Number(index)) transfer.items.add(file);
  });
  input.files = transfer.files;
  previewSelectedImages(input);
}

function renderAdmin() {
  if (!isAdmin()) {
    renderAccessGate("Admin erişimi kapalı", `Admin paneli sadece ${ADMIN_EMAIL} oturumuyla görüntülenir.`);
    return;
  }
  app.innerHTML = `
    <section class="dashboard-shell">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Admin panel</p>
          <h2>Onaylar, ödemeler ve komisyonlar</h2>
        </div>
        <div class="admin-profile-card">
          <span class="profile-silhouette" aria-hidden="true">${userInitials()}</span>
          <div>
            <strong>${state.authProfile?.full_name || "Admin"}</strong>
            <p class="muted">${state.currentUser?.email || ADMIN_EMAIL}</p>
          </div>
          <button class="ghost-action" data-route="auth">Profili görüntüle</button>
          <button class="ghost-action danger-action" data-logout>Çıkış yap</button>
          <span class="tag">PaymentProvider: DummyPOS</span>
        </div>
      </div>
      <div class="dashboard-layout">
        <nav class="side-tabs">
          ${["approvals", "payments", "commissions", "categories", "support"].map((tab) => `<button class="tab-button ${state.adminTab === tab ? "active" : ""}" data-admin-tab="${tab}">${adminTabLabel(tab)}</button>`).join("")}
        </nav>
        <div>${adminPanel()}</div>
      </div>
    </section>
  `;
}

function adminTabLabel(tab) {
  return { approvals: "Onaylar", payments: "Satılan etkinlikler", commissions: "Komisyonlar", categories: "Kategoriler", support: "Destek" }[tab];
}

function adminPanel() {
  if (state.adminTab === "approvals") {
    const pendingVendors = state.vendors.filter((vendor) => vendor.status === "pending" && (!state.supabaseReady || isUuid(vendor.id)));
    const pendingActivities = state.activities.filter((activity) => activity.status === "pending" && (!state.supabaseReady || isUuid(activity.id)));
    return `
      <div class="panel">
        <h3>Onay bekleyen firmalar</h3>
        ${pendingVendors.map((vendor) => `<div class="mini-card"><strong>${vendor.name}</strong><p class="muted">${vendor.district} · ${vendor.plan}</p><button class="primary-action" data-approve-vendor="${vendor.id}">Firmayı onayla</button></div>`).join("") || `<div class="empty-state">Firma onayı beklemiyor.</div>`}
        <h3>Onay bekleyen etkinlikler</h3>
        ${pendingActivities.map((activity) => `<div class="mini-card child-card"><div><strong>${activity.title}</strong><p class="muted">${activity.category} · ${getVendor(activity.vendorId)?.name ?? "Firma"}</p></div><div class="button-row"><button class="ghost-action" data-detail="${activity.id}">Önizle</button><button class="primary-action" data-approve-activity="${activity.id}">Etkinliği onayla</button></div></div>`).join("") || `<div class="empty-state">Etkinlik onayı beklemiyor.</div>`}
      </div>
    `;
  }
  if (state.adminTab === "payments") return adminPaymentTable();
  if (state.adminTab === "commissions") return adminCommissionTable();
  if (state.adminTab === "categories") {
    return `<div class="panel">
      <h3>Kategori yönetimi</h3>
      <form id="categoryForm" class="form-grid">
        <label><span>Kategori adı</span><input name="name" required placeholder="Yeni kategori" /></label>
        <button class="primary-action" type="submit">Kategori ekle</button>
      </form>
      <div class="sessions">${state.categories.map((item) => `<div class="mini-card child-card"><strong>${item}</strong><div class="button-row"><button class="ghost-action" data-edit-category="${item}">Düzenle</button><button class="ghost-action danger-action" data-delete-category="${item}">Sil</button></div></div>`).join("")}</div>
    </div>`;
  }
  return `
    <div class="panel">
      <h3>Gelen destek talepleri</h3>
      <div class="sessions">
        ${
          state.supportTickets.length
            ? state.supportTickets
                .map(
                  (ticket) => `
                    <div class="mini-card">
                      <div class="panel-heading">
                        <div>
                          <strong>${ticket.subject}</strong>
                          <p class="muted">${ticket.role} · ${ticket.email} · ${ticket.type}</p>
                        </div>
                        ${supportStatusPill(ticket.status)}
                      </div>
                      <p>${ticket.message}</p>
                      ${ticket.reply ? `<div class="support-reply"><strong>Yanıt</strong><p>${ticket.reply}</p></div>` : ""}
                      <form class="form-grid" data-support-reply-form>
                        <input type="hidden" name="ticketId" value="${ticket.id}" />
                        <label class="wide"><span>Yanıt</span><textarea name="reply" required placeholder="Kullanıcıya gönderilecek yanıt">${ticket.reply || ""}</textarea></label>
                        <button class="primary-action" type="submit">Yanıtı kaydet</button>
                      </form>
                    </div>
                  `,
                )
                .join("")
            : `<div class="empty-state">Henüz destek talebi yok.</div>`
        }
      </div>
    </div>
  `;
}

function adminPaymentTable() {
  const rows = state.bookings.map((booking) => {
    const found = getSession(booking.sessionId);
    const activity = found?.activity;
    const vendor = activity ? getVendor(activity.vendorId) : null;
    return { booking, activity, vendor };
  });
  return `
    <div class="panel">
      <h3>Satılan etkinlikler</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Etkinlik</th><th>Firma</th><th>Satın alan</th><th>Katılımcı çocuk</th><th>Tutar</th><th>Durum</th><th>Aksiyon</th></tr></thead>
          <tbody>${rows.map(({ booking, activity, vendor }) => `<tr><td>${activity?.title ?? booking.id}</td><td>${vendor?.name ?? "-"}</td><td>${booking.buyerName || booking.buyerEmail || "-"}</td><td>${bookingParticipantSummary(booking)}</td><td>${money(booking.totalAmount)}</td><td>${statusPill(booking.status)}</td><td><button class="ghost-action" data-refund="${booking.id}">İade başlat</button></td></tr>`).join("") || `<tr><td colspan="7">Satış kaydı yok.</td></tr>`}</tbody>
        </table>
      </div>
    </div>
  `;
}

function adminCommissionTable() {
  const totalGross = state.bookings.reduce((sum, booking) => sum + booking.totalAmount, 0);
  const totalCommission = state.bookings.reduce((sum, booking) => sum + booking.commissionAmount, 0);
  return `
    <div class="panel">
      <div class="metrics-grid">
        <div class="metric-card"><span>Toplam ciro</span><strong>${money(totalGross)}</strong></div>
        <div class="metric-card"><span>Toplam komisyon</span><strong>${money(totalCommission)}</strong></div>
        <div class="metric-card"><span>Satıcı hak edişi</span><strong>${money(totalGross - totalCommission)}</strong></div>
        <div class="metric-card"><span>Payout</span><strong>pending</strong></div>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Booking</th><th>Oran</th><th>Komisyon</th><th>Payout</th></tr></thead>
          <tbody>${state.bookings.map((booking) => `<tr><td>${booking.id}</td><td>%${Math.round(booking.commissionRate * 100)}</td><td>${money(booking.commissionAmount)}</td><td>pending</td></tr>`).join("") || `<tr><td colspan="4">Komisyon kaydı yok.</td></tr>`}</tbody>
        </table>
      </div>
    </div>
  `;
}

function renderPricing() {
  if (!isVendor()) {
    renderAccessGate("Satıcı hesabı gerekli", "Planlar sadece firma hesaplarında görüntülenir.", "Giriş yap");
    return;
  }
  app.innerHTML = `
    <section class="section-shell">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Planlama</p>
          <h2>Free aktif, Basic ve Pro yakında</h2>
          <p class="muted">MVP’de satıcılardan abonelik alınmaz; gelir başarılı satış ve komisyon üzerinden oluşur.</p>
        </div>
      </div>
      <div class="price-grid">
        ${priceCard("FREE", "₺0", "Aktif", ["Firma profili", "Etkinlik ve seans oluşturma", "Rezervasyon listesi", "Satış başı komisyon"], true)}
        ${priceCard("BASIC", "Yakında", "Pasif", ["Daha gelişmiş raporlar", "Öne çıkarma hakları", "CSV export", "Destek önceliği"], false)}
        ${priceCard("PRO", "Yakında", "Pasif", ["Çoklu ekip kullanıcısı", "Gelişmiş kampanyalar", "API entegrasyonları", "Özel komisyon görüşmesi"], false)}
      </div>
    </section>
  `;
}

function priceCard(name, price, status, features, active) {
  return `
    <article class="price-card ${active ? "featured" : ""}">
      <div class="panel-heading">
        <h3>${name}</h3>
        <span class="status-pill ${active ? "green" : "orange"}">${status}</span>
      </div>
      <strong class="price">${price}</strong>
      <ul>${features.map((feature) => `<li>${feature}</li>`).join("")}</ul>
      <button class="${active ? "primary-action" : "ghost-action"}" ${active ? "" : "disabled"}>${active ? "MVP planı" : "Yakında"}</button>
    </article>
  `;
}

function formatSupabaseError(error) {
  const message = error?.message || String(error);
  if (message.includes("Invalid path specified in request URL")) {
    return "Supabase URL yanlış görünüyor. Vercel SUPABASE_URL değeri sadece https://PROJECT_ID.supabase.co olmalı.";
  }
  return message;
}

async function approveVendor(id) {
  const vendor = state.vendors.find((item) => item.id === id);
  if (vendor) vendor.status = "approved";
  if (state.supabaseReady && !String(id).startsWith("ven-")) {
    await state.supabaseClient.from("vendors").update({ status: "approved" }).eq("id", id);
  }
  state.notifications.unshift({ text: "Firma onaylandı.", read: false });
  notify("Firma onaylandı ve public yayına hazır.");
  renderAdmin();
}

async function approveActivity(id) {
  const activity = state.activities.find((item) => item.id === id);
  if (activity) activity.status = "approved";
  if (state.supabaseReady && !String(id).startsWith("act-")) {
    await state.supabaseClient.from("activities").update({ status: "approved" }).eq("id", id);
  }
  state.notifications.unshift({ text: "Etkinlik onaylandı.", read: false });
  notify("Etkinlik onaylandı ve public listelerde görünecek.");
  renderAdmin();
}

async function handleLogin(form) {
  const data = new FormData(form);
  const email = String(data.get("email")).trim().toLowerCase();
  const password = String(data.get("password"));
  const submitButton = form.querySelector('button[type="submit"]');
  if (submitButton) submitButton.disabled = true;
  state.authRedirecting = true;

  if (!state.supabaseReady) {
    state.currentUser = { id: `demo-${Date.now()}`, email };
    state.authProfile = {
      id: state.currentUser.id,
      email,
      role: email === ADMIN_EMAIL ? "admin" : "parent",
      full_name: email,
    };
    notify("Demo modda giriş yapıldı. Supabase ayarları girilince gerçek oturum açılır.");
    setRoute("home");
    return;
  }

  const { data: authData, error } = await state.supabaseClient.auth.signInWithPassword({ email, password });
  if (submitButton) submitButton.disabled = false;
  if (error) {
    notify(formatSupabaseError(error));
    state.authRedirecting = false;
    return;
  }
  state.currentUser = authData.user;
  state.authProfile = {
    id: authData.user.id,
    email: authData.user.email,
    role: authData.user.email === ADMIN_EMAIL ? "admin" : authData.user.user_metadata?.role ?? "parent",
    full_name: authData.user.user_metadata?.full_name ?? authData.user.email,
  };
  notify("Giriş başarılı.");
  setRoute("home");
  await setSupabaseUser(authData.user);
  await loadMarketplaceData();
  state.authRedirecting = false;
  render();
}

async function handleSignup(form) {
  const data = new FormData(form);
  const email = String(data.get("email")).trim().toLowerCase();
  const password = String(data.get("password"));
  const fullName = String(data.get("fullName")).trim();
  const requestedRole = String(data.get("role"));
  const role = email === ADMIN_EMAIL ? "admin" : requestedRole;
  const vendorName = String(data.get("vendorName") || "").trim();
  const submitButton = form.querySelector('button[type="submit"]');
  if (submitButton) submitButton.disabled = true;
  state.authRedirecting = true;

  if (!state.supabaseReady) {
    state.currentUser = { id: `demo-${Date.now()}`, email };
    state.authProfile = { id: state.currentUser.id, email, role, full_name: fullName };
    if (role === "vendor") {
      state.vendors.unshift({
        id: `ven-${Date.now()}`,
        name: vendorName || fullName,
        slug: (vendorName || fullName).toLocaleLowerCase("tr-TR").replaceAll(" ", "-"),
        status: "pending",
        district: "İstanbul",
        commissionRate: 0.12,
        plan: "FREE",
      });
    }
    notify("Demo üyelik oluşturuldu. Supabase ayarı girilince kayıt veritabanına yazılır.");
    setRoute("home");
    return;
  }

  const { data: authData, error } = await state.supabaseClient.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName, role, vendor_name: vendorName } },
  });
  if (submitButton) submitButton.disabled = false;
  if (error) {
    notify(formatSupabaseError(error));
    state.authRedirecting = false;
    return;
  }

  const user = authData.user;
  if (user && !authData.session) {
    notify(role === "vendor" ? "Firma üyeliği oluşturuldu. Admin onayına gönderildi; e-postayı doğrulayın." : "Üyelik oluşturuldu. E-posta doğrulama için gelen kutusunu kontrol edin.");
    state.authRedirecting = false;
    setRoute("home");
    return;
  }

  if (user) {
    state.currentUser = user;
    state.authProfile = { id: user.id, email, role, full_name: fullName };
    notify(role === "vendor" ? "Firma kaydı oluşturuldu. Admin onayı bekliyor." : "Üyelik oluşturuldu.");
    setRoute("home");
  }

  if (user) {
    await state.supabaseClient.from("profiles").upsert({
      id: user.id,
      email,
      full_name: fullName,
      role,
      status: role === "vendor" ? "pending" : "active",
    });

  }

  await setSupabaseUser(user);
  await loadMarketplaceData();
  state.authRedirecting = false;
  render();
}

async function handleLogout() {
  const client = state.supabaseReady ? state.supabaseClient : null;
  state.currentUser = null;
  state.authProfile = null;
  state.vendorIds = [];
  state.favorites = new Set();
  state.readNotifications = new Set();
  state.notificationOpen = false;
  state.authMode = "choice";
  state.editingChildId = null;
  notify("Çıkış yapıldı.");
  setRoute("home");
  if (client) await client.auth.signOut();
}

async function handleChildCreate(form) {
  const data = new FormData(form);
  const childId = String(data.get("childId") || "");
  const child = {
    id: childId || `child-${Date.now()}`,
    name: String(data.get("name")).trim(),
    age: Number(data.get("age")),
    interests: String(data.get("interests") || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
  };

  if (childId) {
    state.children = state.children.map((item) => (item.id === childId ? child : item));
  } else {
    state.children.push(child);
  }

  if (state.supabaseReady && state.currentUser) {
    if (childId) {
      await state.supabaseClient
        .from("children")
        .update({
          name: child.name,
          age: child.age,
          interests: child.interests,
        })
        .eq("id", childId)
        .eq("user_id", state.currentUser.id);
    } else {
      const { data: insertedChild } = await state.supabaseClient
        .from("children")
        .insert({
          user_id: state.currentUser.id,
          name: child.name,
          age: child.age,
          interests: child.interests,
        })
        .select("id, name, age, interests")
        .single();

      if (insertedChild) {
        child.id = insertedChild.id;
        state.children = state.children.map((item) => (item.id.startsWith("child-") && item.name === child.name ? child : item));
      }
    }
  }

  state.editingChildId = null;
  notify(childId ? "Çocuk profili güncellendi." : "Çocuk profili eklendi.");
  renderAuth();
}

async function handleChildDelete(childId) {
  const child = state.children.find((item) => item.id === childId);
  if (!child) return;

  state.children = state.children.filter((item) => item.id !== childId);
  if (state.editingChildId === childId) state.editingChildId = null;

  if (state.supabaseReady && state.currentUser) {
    await state.supabaseClient.from("children").delete().eq("id", childId).eq("user_id", state.currentUser.id);
  }

  notify("Çocuk profili kaldırıldı.");
  renderAuth();
}

async function toggleFavorite(activityId) {
  if (!state.currentUser || !isParent()) {
    notify("Favoriler ebeveyn hesapları içindir.");
    setRoute("auth");
    return;
  }

  const wasFavorite = state.favorites.has(activityId);
  if (wasFavorite) {
    state.favorites.delete(activityId);
    state.favoriteCounts[activityId] = Math.max(0, favoriteCount(activityId) - 1);
  } else {
    state.favorites.add(activityId);
    state.favoriteCounts[activityId] = favoriteCount(activityId) + 1;
  }

  notify(wasFavorite ? "Favorilerden çıkarıldı." : "Favorilere eklendi.");
  render();

  if (!state.supabaseReady) return;

  const { error } = wasFavorite
    ? isUuid(activityId)
      ? await state.supabaseClient.from("favorites").delete().eq("user_id", state.currentUser.id).eq("activity_id", activityId)
      : { error: null }
    : isUuid(activityId)
      ? await state.supabaseClient.from("favorites").upsert({ user_id: state.currentUser.id, activity_id: activityId })
      : { error: null };

  if (error) {
    wasFavorite ? state.favorites.add(activityId) : state.favorites.delete(activityId);
    state.favoriteCounts[activityId] = Math.max(0, favoriteCount(activityId) + (wasFavorite ? 1 : -1));
    notify(`Favori kaydı güncellenemedi: ${error.message}`);
    render();
    return;
  }

  if (isUuid(activityId)) await loadFavoriteData();
  render();
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("button, a");
  if (!target) return;

  if (target.dataset.route) setRoute(target.dataset.route);
  if (target.dataset.scroll) document.querySelector(`#${target.dataset.scroll}`)?.scrollIntoView({ behavior: "smooth" });
  if (target.dataset.detail) setRoute("detail", target.dataset.detail);
  if (target.hasAttribute("data-notifications")) {
    state.notificationOpen = !state.notificationOpen;
    updateNav();
  }
  if (target.dataset.openNotification) {
    state.readNotifications.add(target.dataset.openNotification);
    state.notificationOpen = false;
    if (target.dataset.notificationTab) {
      if (target.dataset.notificationRoute === "admin") state.adminTab = target.dataset.notificationTab;
      if (target.dataset.notificationRoute === "vendor") state.vendorTab = target.dataset.notificationTab;
    }
    if (target.dataset.notificationActivity) setRoute("detail", target.dataset.notificationActivity);
    else setRoute(target.dataset.notificationRoute || "home");
  }
  if (target.hasAttribute("data-mark-notifications-read")) {
    notificationItems().forEach((item) => state.readNotifications.add(item.id));
    state.notificationOpen = false;
    updateNav();
  }
  if (target.dataset.favorite) {
    toggleFavorite(target.dataset.favorite);
  }
  if (target.dataset.vendorTab) {
    state.vendorTab = target.dataset.vendorTab;
    renderVendor();
  }
  if (target.hasAttribute("data-new-activity")) {
    state.editingActivityId = null;
    state.vendorTab = "new";
    renderVendor();
  }
  if (target.hasAttribute("data-add-session")) addSessionEditor();
  if (target.hasAttribute("data-remove-session")) target.closest("[data-session-editor]")?.remove();
  if (target.dataset.editActivity) {
    state.editingActivityId = target.dataset.editActivity;
    state.vendorTab = "new";
    renderVendor();
  }
  if (target.dataset.deleteActivity) deleteActivity(target.dataset.deleteActivity);
  if (target.hasAttribute("data-cancel-activity-edit")) {
    state.editingActivityId = null;
    renderVendor();
  }
  if (target.dataset.removeGalleryImage) removeGalleryImage(target.dataset.removeGalleryImage);
  if (target.hasAttribute("data-remove-cover")) removeCoverImage();
  if (target.dataset.removeSelectedFile) removeSelectedFile(target.dataset.removeSelectedFile, target.dataset.fileIndex);
  if (target.hasAttribute("data-open-map-search")) {
    const form = target.closest("form");
    const locationQuery = form?.elements.locationQuery?.value || form?.elements.address?.value || "İstanbul";
    window.open(googleMapsSearchUrl({ locationQuery }), "_blank", "noopener,noreferrer");
  }
  if (target.dataset.adminTab) {
    state.adminTab = target.dataset.adminTab;
    renderAdmin();
  }
  if (target.dataset.approveVendor) {
    approveVendor(target.dataset.approveVendor);
  }
  if (target.dataset.approveActivity) {
    approveActivity(target.dataset.approveActivity);
  }
  if (target.dataset.refund) {
    const booking = state.bookings.find((item) => item.id === target.dataset.refund);
    if (booking) booking.status = "refunded";
    notify("İade süreci başlatıldı; komisyon ters kaydı simüle edildi.");
    renderAdmin();
  }
  if (target.dataset.notify) notify(target.dataset.notify);
  if (target.hasAttribute("data-logout")) handleLogout();
  if (target.dataset.authMode) {
    state.authMode = target.dataset.authMode;
    renderAuth();
  }
  if (target.dataset.signupRole) {
    state.signupRole = target.dataset.signupRole;
    state.authMode = "signupForm";
    renderAuth();
  }
  if (target.dataset.editChild) {
    state.editingChildId = target.dataset.editChild;
    renderAuth();
  }
  if (target.dataset.deleteChild) handleChildDelete(target.dataset.deleteChild);
  if (target.hasAttribute("data-cancel-child-edit")) {
    state.editingChildId = null;
    renderAuth();
  }
  if (target.dataset.deleteCategory) {
    state.categories = state.categories.filter((item) => item !== target.dataset.deleteCategory);
    renderAdmin();
  }
  if (target.dataset.editCategory) {
    const nextName = prompt("Kategori adı", target.dataset.editCategory);
    if (nextName) {
      state.categories = state.categories.map((item) => (item === target.dataset.editCategory ? nextName : item));
      renderAdmin();
    }
  }
});

document.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (event.target.id === "bookingForm") await createBooking(event.target);
  if (event.target.id === "activityForm") await createActivity(event.target);
  if (event.target.id === "loginForm") await handleLogin(event.target);
  if (event.target.id === "signupForm") await handleSignup(event.target);
  if (event.target.id === "childForm") await handleChildCreate(event.target);
  if (event.target.id === "categoryForm") {
    const name = new FormData(event.target).get("name");
    if (name && !state.categories.includes(name)) state.categories.push(String(name));
    renderAdmin();
  }
  if (event.target.matches("[data-support-reply-form]")) {
    const data = new FormData(event.target);
    const ticket = state.supportTickets.find((item) => item.id === data.get("ticketId"));
    if (ticket) {
      ticket.reply = String(data.get("reply") || "").trim();
      ticket.status = "answered";
      if (state.supabaseReady && isUuid(ticket.id)) {
        await state.supabaseClient
          .from("support_tickets")
          .update({ reply: ticket.reply, status: "answered", answered_at: new Date().toISOString() })
          .eq("id", ticket.id);
      }
      saveSupportTickets();
      state.notifications.unshift({
        id: `support-reply-${ticket.id}`,
        text: `${ticket.subject} destek talebi yanıtlandı`,
        meta: "Destek",
        route: "support",
      });
    }
    notify("Destek yanıtı kaydedildi.");
    renderAdmin();
  }
  if (event.target.id === "supportForm") {
    const data = new FormData(event.target);
    const ticket = {
      id: `ticket-${Date.now()}`,
      subject: data.get("subject"),
      type: data.get("type"),
      message: data.get("message"),
      email: state.currentUser?.email,
      role: isVendor() ? "Satıcı" : isParent() ? "Ebeveyn" : "Admin",
      status: "pending",
      reply: "",
      userId: state.currentUser?.id,
    };
    state.supportTickets.unshift(ticket);
    if (state.supabaseReady && state.currentUser) {
      const { data: insertedTicket, error } = await state.supabaseClient
        .from("support_tickets")
        .insert({
          user_id: state.currentUser.id,
          email: state.currentUser.email,
          role: ticket.role,
          type: ticket.type,
          subject: ticket.subject,
          message: ticket.message,
          status: "pending",
        })
        .select("*")
        .single();
      if (insertedTicket && !error) {
        state.supportTickets = state.supportTickets.map((item) =>
          item.id === ticket.id
            ? {
                id: insertedTicket.id,
                subject: insertedTicket.subject,
                type: insertedTicket.type,
                message: insertedTicket.message,
                email: insertedTicket.email,
                role: insertedTicket.role,
                status: insertedTicket.status,
                reply: insertedTicket.reply || "",
                userId: insertedTicket.user_id,
                createdAt: insertedTicket.created_at,
              }
            : item,
        );
      }
      if (error) notify(`Destek talebi yerelde kaydedildi; Supabase kaydı başarısız: ${error.message}`);
    }
    saveSupportTickets();
    state.notifications.unshift({ id: `support-${Date.now()}`, text: "Destek talebiniz alındı.", meta: "Destek", route: "support" });
    notify("Destek talebi admin kuyruğuna gönderildi.");
    renderSupport();
  }
});

document.addEventListener("change", (event) => {
  if (event.target.matches('input[type="file"][data-preview-target]')) previewSelectedImages(event.target);
  if (event.target.matches('#bookingForm input[name="session"], #bookingForm input[name="children"]')) {
    updateBookingEstimate(event.target.closest("form"));
  }
  if (event.target.matches('[data-session-time], input[name="sessionDate"]')) {
    updateSessionDuration(event.target.closest("[data-session-editor]"));
  }
});

document.querySelector("#mobileMenu").addEventListener("click", () => {
  document.querySelector(".primary-nav").classList.toggle("open");
});

window.addEventListener("popstate", () => {
  state.route = routeFromPath();
  render();
});

initSupabase().finally(() => {
  state.route = routeFromPath();
  render();
});
