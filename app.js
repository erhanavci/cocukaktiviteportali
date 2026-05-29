const ADMIN_EMAIL = "esinaykanat@gmail.com";

const state = {
  route: "home",
  selectedActivityId: null,
  selectedVendorId: null,
  vendorTab: "overview",
  adminTab: "approvals",
  currentUser: null,
  authProfile: null,
  vendorIds: [],
  adminPermissions: ["all"],
  adminEmails: [ADMIN_EMAIL],
  notifications: [],
  readNotifications: new Set(),
  notificationOpen: false,
  authRedirecting: false,
  autoRefreshTimer: null,
  messageRefreshTimer: null,
  knownNotificationIds: new Set(),
  notificationBaselineReady: false,
  soundUnlocked: false,
  audioContext: null,
  supportTickets: [],
  vendorExpenses: [],
  vendorMessages: [],
  selectedMessageVendorId: null,
  siteSettings: {
    brandName: "Minik Kaşifler",
    brandAccent: "Çocuk Aktivite Portalı",
    heroTitle: "Çocuğunuz için eğlenceli ve eğitici dünyayı keşfedin.",
    heroText: "Sanat, bilim, spor, doğa ve online atölyeler. Yaşa, ilgi alanına ve konuma göre seçilmiş etkinlikleri tek yerden bulun.",
    aboutTitle: "Neden Minik Kaşifler?",
    aboutText: "Amacımız, çocukların potansiyellerini keşfetmelerine yardımcı olmak ve ebeveynlerin güvenilir, kaliteli aktivitelere kolayca ulaşmasını sağlamaktır.",
    contactEmail: "merhaba@minikkasifler.com",
    contactPhone: "+90 (850) 123 45 67",
    contactAddress: "İstanbul",
  },
  socialLinks: [
    { id: "social-instagram", platform: "Instagram", url: "#", isActive: true },
    { id: "social-facebook", platform: "Facebook", url: "#", isActive: true },
    { id: "social-youtube", platform: "YouTube", url: "#", isActive: true },
  ],
  footerLinks: [
    { id: "footer-all", group: "Keşfet", label: "Tüm Etkinlikler", url: "#results", isActive: true },
    { id: "footer-online", group: "Keşfet", label: "Online Kurslar", url: "#results", isActive: true },
    { id: "footer-about", group: "Kurumsal", label: "Hakkımızda", url: "#aboutSection", isActive: true },
    { id: "footer-vendor", group: "Kurumsal", label: "Firma Girişi", url: "#vendor", isActive: true },
    { id: "footer-privacy", group: "Yasal", label: "Gizlilik Politikası", url: "#", isActive: true },
  ],
  editingSocialId: null,
  editingFooterLinkId: null,
  categories: ["Oyun grubu", "Sanat atölyesi", "Spor", "Müzik", "Dans", "Drama", "Müze/gezi", "Bilim/STEM", "Doğa", "Ebeveyn-çocuk", "Tatil kampı", "Düzenli kurs"],
  authMode: "choice",
  signupRole: "parent",
  editingChildId: null,
  editingActivityId: null,
  editingExpenseId: null,
  supabaseClient: null,
  supabaseReady: false,
  supabaseConfigError: "",
  favorites: new Set(["act-art-1"]),
  favoriteCounts: { "act-art-1": 1 },
  bookings: [],
  reviews: [],
  vendors: [
    {
      id: "ven-1",
      name: "Minik Renkler Atölyesi",
      slug: "minik-renkler",
      status: "approved",
      district: "Kadıköy",
      city: "İstanbul",
      address: "Kadıköy",
      description: "Sanat ve oyun odaklı çocuk atölyesi.",
      logoUrl: "",
      commissionRate: 0.12,
      plan: "FREE",
    },
    {
      id: "ven-2",
      name: "Bilim Kutusu",
      slug: "bilim-kutusu",
      status: "approved",
      district: "Beşiktaş",
      city: "İstanbul",
      address: "Beşiktaş",
      description: "STEM ve bilim etkinlikleri.",
      logoUrl: "",
      commissionRate: 0.12,
      plan: "FREE",
    },
    {
      id: "ven-3",
      name: "Müze Kaşifleri",
      slug: "muze-kasifleri",
      status: "pending",
      district: "Beyoğlu",
      city: "İstanbul",
      address: "Beyoğlu",
      description: "Müze ve gezi deneyimleri.",
      logoUrl: "",
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
      deliveryMode: "physical",
      meetingUrl: "",
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
      vendorNote: "Atölye başlamadan 10 dakika önce alanda olmanızı rica ederiz.",
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
      deliveryMode: "hybrid",
      meetingUrl: "https://meet.google.com/demo-robotik",
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
      vendorNote: "Etkinlikte koruyucu gözlük ve önlük firma tarafından sağlanır.",
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
      deliveryMode: "physical",
      meetingUrl: "",
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
      vendorNote: "Rahat kıyafet ve kaymaz çorap önerilir.",
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
      deliveryMode: "physical",
      meetingUrl: "",
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
      vendorNote: "Müze girişinde firma görevlisi ile buluşulur.",
      cancellation: "Satıcı ve admin onaylı iptal/iade süreci uygulanır.",
      parentParticipation: "Ebeveynler müze lobisinde bekleyebilir.",
      sessions: [
        { id: "ses-6", start: "2026-06-06T13:00:00", end: "2026-06-06T15:00:00", capacity: 14, reserved: 2, price: 780, status: "active" },
      ],
    },
  ],
  children: [
    { id: "child-1", name: "Ada", age: 6, interests: ["Sanat atölyesi", "Müze/gezi"] },
    { id: "child-2", name: "Deniz", age: 9, interests: ["Bilim/STEM", "Spor"] },
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
  startAutoRefresh();
  updateNav();

  state.supabaseClient.auth.onAuthStateChange(async (_event, session) => {
    await setSupabaseUser(session?.user ?? null);
    await loadMarketplaceData();
    if (session?.user) {
      startAutoRefresh();
    } else {
      if (state.autoRefreshTimer) clearInterval(state.autoRefreshTimer);
      if (state.messageRefreshTimer) clearInterval(state.messageRefreshTimer);
      state.autoRefreshTimer = null;
      state.messageRefreshTimer = null;
    }
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

  if (state.authProfile.role === "parent" || state.authProfile.role === "admin" || user.email === ADMIN_EMAIL) {
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

  if (state.authProfile.role === "vendor" || state.authProfile.role === "admin" || user.email === ADMIN_EMAIL) {
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
        address: "",
        description: "",
        logo_url: "",
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
  return state.currentUser?.email === ADMIN_EMAIL || state.authProfile?.role === "admin" || state.adminEmails.includes(state.currentUser?.email);
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

function initials(source = "?") {
  return String(source)
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
    state.vendorMessages
      .filter((message) => message.senderRole === "vendor" && !message.readByAdmin)
      .forEach((message) =>
        items.push({
          id: `admin-message-${message.id}`,
          text: `${message.vendorName || "Satıcı"} yeni mesaj gönderdi`,
          meta: "Satıcı mesajları",
          route: "admin",
          tab: "messages",
        }),
      );
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
    state.vendorMessages
      .filter((message) => message.vendorId === vendor?.id && message.senderRole === "admin" && !message.readByVendor)
      .forEach((message) =>
        items.push({
          id: `vendor-message-${message.id}`,
          text: "Admin yeni mesaj gönderdi",
          meta: "Mesajlar",
          route: "vendor",
          tab: "messages",
        }),
      );
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
        if (booking.status === "cancelled_by_user") {
          items.push({
            id: `vendor-cancel-${booking.id}-${booking.cancelledAt || booking.status}`,
            text: `${booking.buyerName || booking.buyerEmail || "Bir kullanıcı"} ${found?.activity.title || "etkinlik"} katılımını iptal etti`,
            meta: "Rezervasyon iptali",
            route: "vendor",
            tab: "bookings",
          });
          return;
        }
        if (!["confirmed", "pending_payment"].includes(booking.status)) return;
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

function unreadNotificationIds() {
  return new Set(notificationItems().filter((item) => !state.readNotifications.has(item.id)).map((item) => item.id));
}

function unlockNotificationSound() {
  if (state.soundUnlocked) return;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;
  state.audioContext = state.audioContext || new AudioContextClass();
  state.audioContext.resume?.();
  state.soundUnlocked = true;
}

function playBlip() {
  try {
    unlockNotificationSound();
    const context = state.audioContext;
    if (!context) return;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(880, context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(1320, context.currentTime + 0.08);
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.12, context.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.16);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.18);
  } catch {
    // Browsers can block audio before the first user gesture; silently skip in that case.
  }
}

function syncNotificationAlerts() {
  const nextIds = unreadNotificationIds();
  const hasNew = [...nextIds].some((id) => !state.knownNotificationIds.has(id));
  if (state.notificationBaselineReady && hasNew) playBlip();
  state.knownNotificationIds = nextIds;
  state.notificationBaselineReady = true;
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

  await loadSiteSettings();

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
      city: vendor.city ?? "İstanbul",
      address: vendor.address ?? "",
      description: vendor.description ?? "",
      logoUrl: vendor.logo_url ?? "",
      commissionRate: Number(vendor.commission_rate ?? 0.12),
      plan: vendor.plan_code ?? "FREE",
    }));
  }

  await loadCategoryData();

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
      deliveryMode: activity.delivery_mode ?? "physical",
      meetingUrl: activity.meeting_url ?? "",
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
      vendorNote: activity.vendor_note ?? "",
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
  await loadReviewData();
  await loadSupportTickets();
  await loadVendorExpenses();
  await loadVendorMessages();
  await loadAdminUsers();
}

async function loadCategoryData() {
  if (!state.supabaseReady) return;
  const { data, error } = await state.supabaseClient.from("categories").select("name").order("name", { ascending: true });
  if (!error && data?.length) state.categories = data.map((category) => category.name);
}

async function loadSiteSettings() {
  if (!state.supabaseReady) return;
  const [settingsResult, socialsResult, footerResult] = await Promise.all([
    state.supabaseClient.from("site_settings").select("key,value"),
    state.supabaseClient.from("social_links").select("*").order("sort_order", { ascending: true }),
    state.supabaseClient.from("footer_links").select("*").order("sort_order", { ascending: true }),
  ]);
  if (!settingsResult.error && settingsResult.data?.length) {
    const next = { ...state.siteSettings };
    settingsResult.data.forEach((item) => {
      if (item.key in next) next[item.key] = item.value;
    });
    state.siteSettings = next;
  }
  if (!socialsResult.error && socialsResult.data) {
    state.socialLinks = socialsResult.data.map((item) => ({
      id: item.id,
      platform: item.platform,
      url: item.url,
      isActive: item.is_active,
    }));
  }
  if (!footerResult.error && footerResult.data) {
    state.footerLinks = footerResult.data.map((item) => ({
      id: item.id,
      group: item.link_group,
      label: item.label,
      url: item.url,
      isActive: item.is_active,
    }));
  }
}

async function loadReviewData() {
  if (!state.supabaseReady) return;
  const { data, error } = await state.supabaseClient
    .from("activity_reviews")
    .select("*, user:profiles(full_name, email)")
    .order("created_at", { ascending: false });
  if (!error && data) {
    state.reviews = data.map((review) => ({
      id: review.id,
      activityId: review.activity_id,
      userId: review.user_id,
      rating: Number(review.rating),
      comment: review.comment || "",
      author: review.user?.full_name || review.user?.email || "Kullanıcı",
      createdAt: review.created_at,
    }));
  }
}

async function loadVendorExpenses() {
  if (!state.supabaseReady || !state.currentUser || (!isVendor() && !isAdmin())) return;
  const { data, error } = await state.supabaseClient
    .from("vendor_expenses")
    .select("*, vendor:vendors(name)")
    .order("expense_date", { ascending: false });
  if (!error && data) {
    state.vendorExpenses = data.map((expense) => ({
      id: expense.id,
      vendorId: expense.vendor_id,
      title: expense.title,
      amount: Number(expense.amount || 0),
      description: expense.description || "",
      expenseDate: expense.expense_date,
      vendorName: expense.vendor?.name || "",
      createdAt: expense.created_at,
    }));
  }
}

async function loadVendorMessages() {
  if (!state.supabaseReady || !state.currentUser || (!isVendor() && !isAdmin())) return;
  const { data, error } = await state.supabaseClient
    .from("vendor_messages")
    .select("*, vendor:vendors(name), sender:profiles(full_name, email)")
    .order("created_at", { ascending: true });
  if (!error && data) {
    state.vendorMessages = data.map((message) => ({
      id: message.id,
      vendorId: message.vendor_id,
      vendorName: message.vendor?.name || "",
      senderId: message.sender_id,
      senderName: message.sender?.full_name || message.sender?.email || "",
      senderRole: message.sender_role,
      body: message.body,
      readByAdmin: Boolean(message.read_by_admin),
      readByVendor: Boolean(message.read_by_vendor),
      createdAt: message.created_at,
    }));
  }
}

function startAutoRefresh() {
  if (state.autoRefreshTimer) clearInterval(state.autoRefreshTimer);
  state.autoRefreshTimer = setInterval(async () => {
    if (!state.supabaseReady || !state.currentUser) return;
    await loadMarketplaceData();
    updateNav();
  }, 30000);
  startMessageRefresh();
}

function startMessageRefresh() {
  if (state.messageRefreshTimer) clearInterval(state.messageRefreshTimer);
  state.messageRefreshTimer = setInterval(refreshVendorMessages, 1000);
}

async function refreshVendorMessages() {
  if (!state.supabaseReady || !state.currentUser || (!isVendor() && !isAdmin())) return;
  const activeForm = document.activeElement?.closest?.("#vendorMessageForm");
  await loadVendorMessages();
  updateNav();
  if (activeForm) return;
  if (isVendor() && state.route === "vendor" && state.vendorTab === "messages") renderVendor();
  if (isAdmin() && state.route === "admin" && state.adminTab === "messages") renderAdmin();
}

async function loadAdminUsers() {
  if (!state.supabaseReady || !state.currentUser) return;
  const { data, error } = await state.supabaseClient.from("admin_users").select("email").eq("status", "active");
  if (!error && data) state.adminEmails = [...new Set([ADMIN_EMAIL, ...data.map((item) => item.email)])];
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
        userId: booking.user_id,
        activityId: found.activity.id,
        sessionId: booking.session_id,
        childId: booking.participants?.[0]?.child_id ?? "",
        childIds: (booking.participants ?? []).map((participant) => participant.child_id),
        childNames: (booking.participants ?? []).map((participant) => participant.child?.name).filter(Boolean),
        participantCount: Number(booking.participant_count ?? booking.participants?.length ?? 1),
        buyerName: booking.user?.full_name || booking.user?.email || "",
        buyerEmail: booking.user?.email || "",
        status: booking.status,
        paymentProvider: "Supabase",
        totalAmount,
        commissionRate,
        commissionAmount: Math.round(totalAmount * commissionRate),
        createdAt: booking.created_at,
        cancelledAt: booking.cancelled_at,
        notes: "",
      };
    })
    .filter(Boolean);
  syncSessionReservationsFromBookings();
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

function deliveryLabel(mode) {
  return { physical: "Fiziksel", online: "Online", hybrid: "Hibrit" }[mode] || "Fiziksel";
}

function isOnlineActivity(activity) {
  return ["online", "hybrid"].includes(activity.deliveryMode);
}

function demoMeetUrl(activityTitle) {
  return `https://meet.google.com/demo-${slugify(activityTitle || "etkinlik").slice(0, 24) || "etkinlik"}`;
}

function activityMeetingUrl(activity) {
  if (!isOnlineActivity(activity)) return "";
  return activity.meetingUrl || demoMeetUrl(activity.title);
}

function remainingLabel(activity) {
  const remaining = activity.sessions.reduce((sum, session) => sum + Math.max(0, session.capacity - session.reserved), 0);
  if (activity.participationType === "private") return remaining > 0 ? "Bire bir uygun" : "Bire bir dolu";
  return `${remaining} kişilik yer kaldı`;
}

function activityReviews(activityId) {
  return state.reviews.filter((review) => review.activityId === activityId);
}

function ratingSummary(activityId) {
  const reviews = activityReviews(activityId);
  if (!reviews.length) return { count: 0, average: 0 };
  const total = reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0);
  return { count: reviews.length, average: total / reviews.length };
}

function starText(rating) {
  const value = Math.max(0, Math.min(5, Math.round(Number(rating) || 0)));
  return `${"★★★★★".slice(0, value)}${"☆☆☆☆☆".slice(0, 5 - value)}`;
}

function purchasedBookingForActivity(activityId) {
  if (!state.currentUser || !isParent()) return null;
  return state.bookings.find((booking) => {
    const isOwner = !booking.userId || booking.userId === state.currentUser.id;
    return isOwner && booking.activityId === activityId && ["confirmed", "pending_payment"].includes(booking.status);
  });
}

function userCanReview(activityId) {
  return Boolean(purchasedBookingForActivity(activityId));
}

function userReviewForActivity(activityId) {
  if (!state.currentUser) return null;
  return state.reviews.find((review) => review.activityId === activityId && review.userId === state.currentUser.id) ?? null;
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

function syncSessionReservationsFromBookings() {
  const reservedBySession = state.bookings.reduce((map, booking) => {
    if (booking.status === "refunded" || booking.status === "failed") return map;
    map[booking.sessionId] = (map[booking.sessionId] || 0) + (booking.participantCount || booking.childIds?.length || 1);
    return map;
  }, {});

  state.activities.forEach((activity) => {
    activity.sessions.forEach((session) => {
      if (reservedBySession[session.id] != null) session.reserved = reservedBySession[session.id];
    });
  });
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
  if (route === "detail") state.selectedActivityId = id ?? state.selectedActivityId;
  if (route === "vendorDetail") state.selectedVendorId = id ?? state.selectedVendorId;
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
  const brandStrong = document.querySelector(".brand strong");
  const brandSmall = document.querySelector(".brand small");
  if (brandStrong) brandStrong.textContent = state.siteSettings.brandName;
  if (brandSmall) brandSmall.textContent = state.siteSettings.brandAccent;
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
    authButton.dataset.route = isAdmin() ? "admin" : isVendor() ? "vendor" : "auth";
  }

  document.querySelectorAll(".nav-link").forEach((button) => {
    button.classList.toggle("active", button.dataset.route === state.route);
  });
  notificationButton?.classList.toggle("active", state.notificationOpen);
  renderNotificationMenu();
  syncNotificationAlerts();
}

function renderNotificationMenu() {
  document.querySelector("#notificationMenu")?.remove();
  if (!state.notificationOpen || !state.currentUser) return;

  const menu = document.createElement("div");
  menu.id = "notificationMenu";
  menu.className = "notification-menu";
  const items = notificationItems().filter((item) => !state.readNotifications.has(item.id));
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
                  <button class="notification-item" data-open-notification="${item.id}" data-notification-route="${item.route}" data-notification-tab="${item.tab}" data-notification-activity="${item.activityId}">
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

function showPopup(title, message) {
  document.querySelector("#messageModal")?.remove();
  const modal = document.createElement("div");
  modal.id = "messageModal";
  modal.className = "message-modal";
  modal.innerHTML = `
    <div class="message-modal-card">
      <p class="eyebrow">Satıcı notu</p>
      <h3>${title}</h3>
      <p>${message}</p>
      <button class="primary-action" data-close-modal>Kapat</button>
    </div>
  `;
  document.body.appendChild(modal);
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
    cancelled_by_user: ["Kullanıcı iptal etti", "orange"],
    cancelled_by_vendor: ["Satıcı iptal etti", "orange"],
    cancelled_by_admin: ["Admin iptal etti", "orange"],
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
  if (state.route === "vendorDetail") renderVendorDetail();
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
  app.querySelector(".brand strong")?.replaceChildren(document.createTextNode(state.siteSettings.brandName));
  const heroTitle = app.querySelector(".hero-copy-block h1");
  const heroText = app.querySelector(".hero-copy");
  const aboutTitle = app.querySelector(".about-content h2");
  const aboutText = app.querySelector(".about-content > p:not(.eyebrow)");
  if (heroTitle) heroTitle.textContent = state.siteSettings.heroTitle;
  if (heroText) heroText.textContent = state.siteSettings.heroText;
  if (aboutTitle) aboutTitle.textContent = state.siteSettings.aboutTitle;
  if (aboutText) aboutText.textContent = state.siteSettings.aboutText;
  app.querySelector('[data-stat="activityCount"]').textContent = activities.length;
  app.querySelector('[data-stat="sessionCount"]').textContent = activities.reduce((sum, activity) => sum + activity.sessions.length, 0);
  renderCategoryShowcase();
  renderSiteFooter();
  setupFilters();
  renderActivityGrid(activities);
  setupHeroSearch();
}

function renderCategoryShowcase() {
  const grid = app.querySelector("#categoryGrid");
  if (!grid) return;
  const palette = ["blue", "green", "orange", "purple", "red", "yellow"];
  grid.innerHTML = state.categories
    .slice(0, 12)
    .map((category, index) => `<button class="category-tile ${palette[index % palette.length]}" data-category-filter="${category}"><span class="category-icon ${categoryIcon(category)}" aria-hidden="true"></span><strong>${category}</strong></button>`)
    .join("");
}

function categoryIcon(category) {
  const text = category.toLocaleLowerCase("tr-TR");
  if (text.includes("sanat")) return "icon-palette";
  if (text.includes("bilim") || text.includes("stem")) return "icon-flask";
  if (text.includes("kod")) return "icon-code";
  if (text.includes("spor")) return "icon-ball";
  if (text.includes("müzik") || text.includes("dans")) return "icon-music";
  if (text.includes("doğa")) return "icon-tree";
  if (text.includes("müze")) return "icon-museum";
  if (text.includes("oyun")) return "icon-play";
  return "icon-star";
}

function socialIcon(platform) {
  const text = platform.toLocaleLowerCase("tr-TR");
  if (text.includes("instagram")) return "social-instagram";
  if (text.includes("facebook")) return "social-facebook";
  if (text.includes("youtube")) return "social-youtube";
  if (text.includes("x") || text.includes("twitter")) return "social-x";
  if (text.includes("linkedin")) return "social-linkedin";
  return "social-generic";
}

function renderSiteFooter() {
  const footer = app.querySelector("#siteFooter");
  if (!footer) return;
  const groups = [...new Set(state.footerLinks.filter((link) => link.isActive).map((link) => link.group))];
  footer.innerHTML = `
    <div class="footer-grid">
      <section>
        <div class="footer-brand"><span class="brand-mark">MK</span><strong>${state.siteSettings.brandName}</strong></div>
        <p>${state.siteSettings.brandAccent}. Çocukların eğlenerek öğrendiği, ebeveynlerin güvenle tercih ettiği aktivite rehberi.</p>
        <div class="social-row">
          ${state.socialLinks.filter((link) => link.isActive).map((link) => `<a class="${socialIcon(link.platform)}" href="${link.url}" target="_blank" rel="noreferrer" aria-label="${link.platform}"><span aria-hidden="true"></span></a>`).join("")}
        </div>
      </section>
      ${groups
        .map(
          (group) => `
            <section>
              <h3>${group}</h3>
              <ul>${state.footerLinks.filter((link) => link.isActive && link.group === group).map((link) => `<li><a href="${link.url}">${link.label}</a></li>`).join("")}</ul>
            </section>
          `,
        )
        .join("")}
      <section>
        <h3>İletişim</h3>
        <p>${state.siteSettings.contactAddress}</p>
        <p>${state.siteSettings.contactPhone}</p>
        <p>${state.siteSettings.contactEmail}</p>
      </section>
    </div>
    <div class="footer-bottom"><span>© 2026 ${state.siteSettings.brandName}. Tüm hakları saklıdır.</span></div>
  `;
}

function setupHeroSearch() {
  const heroForm = app.querySelector("#heroSearch");
  const filters = app.querySelector("#filters");
  if (!heroForm || !filters) return;
  heroForm.addEventListener("submit", (event) => {
    event.preventDefault();
    filters.elements.query.value = heroForm.elements.query.value;
    if (heroForm.elements.location.value === "Online") filters.elements.type.value = "Online";
    app.querySelector("#results")?.scrollIntoView({ behavior: "smooth" });
    renderActivityGrid(filterActivities(new FormData(filters)));
  });
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
  const selectedInterests = new Set(editingChild?.interests ?? []);
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
      <fieldset class="wide option-group">
        <legend>İlgi alanları</legend>
        <div class="interest-grid">
          ${state.categories
            .map(
              (category) => `
                <label class="check-row">
                  <input type="checkbox" name="interests" value="${category}" ${selectedInterests.has(category) ? "checked" : ""} />
                  <span>${category}</span>
                </label>
              `,
            )
            .join("")}
        </div>
      </fieldset>
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
    type: ["Tümü", "Fiziksel", "Online", "Hibrit", ...new Set(state.activities.map((activity) => activity.type))],
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
      (type === "Tümü" || activity.type === type || deliveryLabel(activity.deliveryMode) === type) &&
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
      const vendor = getVendor(activity.vendorId) || { id: activity.vendorId, name: "Firma" };
      const summary = ratingSummary(activity.id);
      const duration = activity.sessions?.[0] ? durationMinutes(activity.sessions[0].start, activity.sessions[0].end) : 120;
      return `
        <article class="activity-card">
          <div class="activity-visual" style="${activity.imageUrl ? `--image:url('${activity.imageUrl}')` : `--visual:${activity.visual}`}">
            <strong>${isOnlineActivity(activity) ? "Online Katılım" : activity.category}</strong>
            ${isParent() ? `<button class="card-heart ${state.favorites.has(activity.id) ? "active" : ""}" data-favorite="${activity.id}" title="Favori">♥</button>` : ""}
          </div>
          <div class="activity-body">
            <div class="card-meta-line">
              <span class="category-chip">${activity.category}</span>
              <span class="stars">${summary.count ? starText(summary.average) : "☆☆☆☆☆"} ${summary.count ? `<small>(${summary.count})</small>` : ""}</span>
            </div>
            <h3>${activity.title}</h3>
            <p class="muted">Düzenleyen <button class="text-link" data-vendor-detail="${vendor.id}">${vendor.name}</button> · ${activity.type}</p>
            <p class="card-description">${activity.description}</p>
            <div class="activity-facts">
              <span>${duration >= 60 ? `${Math.round(duration / 60)} saat` : `${duration} dk`}</span>
              <span>${activity.minAge}-${activity.maxAge} yaş</span>
              <span>${deliveryLabel(activity.deliveryMode)}</span>
              <span>${remainingLabel(activity)}</span>
            </div>
            <div class="card-footer">
              <span class="location-label">${isOnlineActivity(activity) ? "Google Meet" : activity.district}</span>
              <span class="price">${money(activity.price)}</span>
              <div class="button-row">
                <button class="primary-action" data-detail="${activity.id}">Detay</button>
              </div>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderVendorDetail() {
  const vendor = state.vendors.find((item) => item.id === state.selectedVendorId) ?? currentVendor() ?? state.vendors[0];
  const activities = publishedActivities().filter((activity) => activity.vendorId === vendor?.id);
  app.innerHTML = `
    <section class="section-shell">
      <button class="ghost-action" data-route="home">← Keşfe dön</button>
      <div class="panel vendor-public-header">
        <div class="vendor-header-profile">
          <span class="vendor-logo-thumb large">${vendor?.logoUrl ? `<img src="${vendor.logoUrl}" alt="${vendor.name} logo" />` : initials(vendor?.name || "Firma")}</span>
          <div>
            <p class="eyebrow">Firma profili</p>
            <h2>${vendor?.name || "Firma"}</h2>
            <p class="muted">${vendor?.district || ""} ${vendor?.city || ""}</p>
          </div>
        </div>
        <p>${vendor?.description || "Bu firma için açıklama henüz eklenmedi."}</p>
      </div>
      <div class="section-heading">
        <div>
          <p class="eyebrow">Yayınlanan etkinlikler</p>
          <h2>${vendor?.name || "Firma"} etkinlikleri</h2>
        </div>
      </div>
      <div id="activityGrid" class="activity-grid"></div>
    </section>
  `;
  renderActivityGrid(activities);
}

function renderReviewPanel(activity) {
  const reviews = activityReviews(activity.id);
  const summary = ratingSummary(activity.id);
  const ownReview = userReviewForActivity(activity.id);
  const canReview = userCanReview(activity.id);
  return `
    <h3>Yorumlar ve puanlama</h3>
    <div class="review-summary detail-review-summary">
      <span class="stars">${summary.count ? starText(summary.average) : "☆☆☆☆☆"}</span>
      <span>${summary.count ? `${summary.average.toFixed(1)} / 5 · ${summary.count} yorum` : "Bu etkinlik için ilk yorumu satın alma sonrası bırakabilirsiniz."}</span>
    </div>
    ${
      canReview && !ownReview
        ? `
          <form id="reviewForm" class="review-form">
            <input type="hidden" name="activityId" value="${activity.id}" />
            <label>
              Puan
              <select name="rating" required>
                <option value="5">5 yıldız</option>
                <option value="4">4 yıldız</option>
                <option value="3">3 yıldız</option>
                <option value="2">2 yıldız</option>
                <option value="1">1 yıldız</option>
              </select>
            </label>
            <label>
              Yorum
              <textarea name="comment" required placeholder="Deneyiminizi kısaca paylaşın"></textarea>
            </label>
            <button class="primary-action" type="submit">Yorum ekle</button>
          </form>
        `
        : ownReview
          ? `<div class="support-reply"><strong>Yorumunuz</strong><p><span class="stars">${starText(ownReview.rating)}</span> ${ownReview.comment}</p></div>`
          : `<p class="muted">Yorum ve yıldız puanı yalnızca satın aldığınız etkinlikler için açılır.</p>`
    }
    <div class="review-list">
      ${
        reviews.length
          ? reviews
              .map(
                (review) => `
                  <div class="mini-card review-item">
                    <div class="panel-heading">
                      <div>
                        <strong>${review.author}</strong>
                        <p class="muted">${review.createdAt ? dateTime(review.createdAt) : ""}</p>
                      </div>
                      <span class="stars">${starText(review.rating)}</span>
                    </div>
                    <p>${review.comment}</p>
                  </div>
                `,
              )
              .join("")
          : `<div class="empty-state">Henüz yorum yok.</div>`
      }
    </div>
  `;
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
          <p class="muted">Düzenleyen <button class="text-link" data-vendor-detail="${vendor.id}">${vendor.name}</button> · ${activity.district} · ${activity.minAge}-${activity.maxAge} yaş</p>
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
            <span class="tag">${deliveryLabel(activity.deliveryMode)}</span>
            <span class="tag">${activity.participationType === "private" ? "Bire bir etkinlik" : "Toplu etkinlik"}</span>
            ${activity.vendorNote ? `<span class="tag">Satıcı notu var</span>` : ""}
            <span class="tag">${favoriteCount(activity.id)} favori</span>
            <span class="tag">${remainingLabel(activity)}</span>
            ${activity.address ? `<span class="tag">${activity.address}</span>` : ""}
            <span class="tag">${activity.parentParticipation}</span>
            <span class="tag">${activity.cancellation}</span>
          </div>
          ${activity.vendorNote ? `<div class="support-reply"><strong>Satıcı notu</strong><p>${activity.vendorNote}</p></div>` : ""}
          ${
            isOnlineActivity(activity) && userCanReview(activity.id)
              ? `<div class="support-reply"><strong>Online katılım</strong><p>Rezervasyonunuz olduğu için Google Meet bağlantısı açıldı.</p><a class="ghost-action map-link" href="${activityMeetingUrl(activity)}" target="_blank" rel="noreferrer">Google Meet'e katıl</a></div>`
              : isOnlineActivity(activity)
                ? `<div class="support-reply"><strong>Online etkinlik</strong><p>Google Meet bağlantısı rezervasyon sonrası görüntülenir.</p></div>`
                : ""
          }
          <h3>Konum</h3>
          ${
            activity.deliveryMode === "online"
              ? `<div class="empty-state">Bu etkinlik online yapılır.</div>`
              : `<div class="map-frame"><iframe title="${activity.title} konumu" src="${mapEmbedUrl(activity)}" loading="lazy"></iframe></div><a class="ghost-action map-link" href="${googleMapsSearchUrl(activity)}" target="_blank" rel="noreferrer">Google Maps'te aç</a>`
          }
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
          ${renderReviewPanel(activity)}
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
    userId: state.currentUser.id,
    activityId: activity.id,
    sessionId,
    childId: childIds[0],
    childIds,
    participantCount,
    status,
    paymentProvider: paymentMethod === "online" ? "DummyPOS" : "Yerinde ödeme",
    totalAmount,
    commissionRate: vendor.commissionRate,
    commissionAmount: Math.round(totalAmount * vendor.commissionRate),
    createdAt: new Date().toISOString(),
    cancelledAt: null,
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
      booking.id = insertedBooking.id;
      const participants = childIds
        .filter(isUuid)
        .map((childId) => ({ booking_id: insertedBooking.id, child_id: childId }));
      if (participants.length) await state.supabaseClient.from("booking_participants").insert(participants);
    }
  }

  notify("Rezervasyon onaylandı, komisyon kaydı oluşturuldu.");
  setRoute("bookings");
  if (activity.vendorNote) showPopup(activity.title, activity.vendorNote);
}

async function createReview(form) {
  if (!state.currentUser || !isParent()) {
    notify("Yorum eklemek için ebeveyn hesabıyla giriş yapın.");
    return;
  }

  const data = new FormData(form);
  const activityId = String(data.get("activityId") || "");
  const purchasedBooking = purchasedBookingForActivity(activityId);
  if (!purchasedBooking) {
    notify("Yorum yalnızca satın aldığınız etkinlikler için eklenebilir.");
    return;
  }

  const rating = Math.max(1, Math.min(5, Number(data.get("rating") || 5)));
  const comment = String(data.get("comment") || "").trim();
  if (!comment) {
    notify("Yorum alanını doldurun.");
    return;
  }

  const existing = userReviewForActivity(activityId);
  const review = {
    id: existing?.id || `review-${Date.now()}`,
    activityId,
    userId: state.currentUser.id,
    rating,
    comment,
    author: state.authProfile?.full_name || state.currentUser.email || "Kullanıcı",
    createdAt: existing?.createdAt || new Date().toISOString(),
  };
  state.reviews = [review, ...state.reviews.filter((item) => item.id !== review.id && !(item.activityId === activityId && item.userId === state.currentUser.id))];

  if (state.supabaseReady && isUuid(activityId)) {
    const payload = {
      activity_id: activityId,
      user_id: state.currentUser.id,
      booking_id: isUuid(purchasedBooking.id) ? purchasedBooking.id : null,
      rating,
      comment,
    };
    const { error } = await state.supabaseClient.from("activity_reviews").upsert(payload, { onConflict: "activity_id,user_id" });
    if (error) {
      notify(`Yorum yerelde eklendi; Supabase kaydı başarısız: ${error.message}`);
      renderDetail();
      return;
    }
    await loadReviewData();
  }

  notify("Yorum ve puanınız eklendi.");
  renderDetail();
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
  const onlineLink = isOnlineActivity(activity) && ["confirmed", "pending_payment"].includes(booking.status) ? activityMeetingUrl(activity) : "";
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
        ${onlineLink ? `<a class="tag link-tag" href="${onlineLink}" target="_blank" rel="noreferrer">Google Meet</a>` : ""}
      </div>
      ${canCancelBooking(booking) ? `<button class="ghost-action danger-action" data-cancel-booking="${booking.id}">Rezervasyonu iptal et</button>` : ""}
    </article>
  `;
}

function canCancelBooking(booking) {
  const found = getSession(booking.sessionId);
  if (!found) return false;
  const cancellableStatuses = ["confirmed", "pending_payment"];
  if (isVendor()) return cancellableStatuses.includes(booking.status);
  return isParent() && cancellableStatuses.includes(booking.status) && new Date(found.session.start).getTime() - Date.now() >= 24 * 60 * 60 * 1000;
}

function monthlyUserCancellationCount(referenceDate = new Date()) {
  if (!state.currentUser) return 0;
  const month = referenceDate.getMonth();
  const year = referenceDate.getFullYear();
  return state.bookings.filter((booking) => {
    const isOwner = !booking.userId || booking.userId === state.currentUser.id;
    if (!isOwner || booking.status !== "cancelled_by_user") return false;
    const cancelledDate = new Date(booking.cancelledAt || booking.createdAt || 0);
    return cancelledDate.getMonth() === month && cancelledDate.getFullYear() === year;
  }).length;
}

function notifyCancellationLimit({ showToast = true } = {}) {
  const text = "Aylık iptal hakkınız 2 adet ile sınırlıdır. Bu ay iptal hakkınızı doldurdunuz.";
  state.notifications.unshift({
    id: `cancel-limit-${state.currentUser?.id || "demo"}-${new Date().toISOString()}`,
    text,
    meta: "Rezervasyon",
    route: "bookings",
  });
  if (showToast) notify(text);
  updateNav();
}

async function cancelBooking(id) {
  const booking = state.bookings.find((item) => item.id === id);
  if (!booking || !canCancelBooking(booking)) {
    notify("Etkinliğe 24 saatten az kaldığı için iptal yapılamaz.");
    return;
  }
  const nextStatus = isVendor() ? "cancelled_by_vendor" : "cancelled_by_user";
  if (nextStatus === "cancelled_by_user" && monthlyUserCancellationCount() >= 2) {
    notifyCancellationLimit();
    return;
  }
  const cancelledAt = new Date().toISOString();
  booking.status = nextStatus;
  booking.cancelledAt = cancelledAt;
  const found = getSession(booking.sessionId);
  if (found) found.session.reserved = Math.max(0, found.session.reserved - (booking.participantCount || booking.childIds?.length || 1));
  if (nextStatus === "cancelled_by_user") {
    const cancellationCount = monthlyUserCancellationCount();
    state.notifications.unshift({
      id: `cancelled-booking-${booking.id}`,
      text: `${found?.activity.title || "Etkinlik"} rezervasyonunuz iptal edildi. Bu ay kalan iptal hakkınız: ${Math.max(0, 2 - cancellationCount)}`,
      meta: "Rezervasyon",
      route: "bookings",
    });
    if (cancellationCount >= 2) notifyCancellationLimit({ showToast: false });
  }
  if (state.supabaseReady && isUuid(id)) {
    const { error } = await state.supabaseClient.from("bookings").update({ status: nextStatus, cancelled_at: cancelledAt }).eq("id", id);
    if (error) notify(`İptal yerelde yapıldı; Supabase güncellenemedi: ${error.message}`);
  }
  notify("Rezervasyon iptal edildi.");
  isVendor() ? renderVendor() : renderBookings();
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
        <div class="vendor-header-profile">
          <span class="vendor-logo-thumb">${vendor.logoUrl ? `<img src="${vendor.logoUrl}" alt="${vendor.name} logo" />` : userInitials()}</span>
          ${statusPill(vendor.status)}
          <button class="ghost-action danger-action" data-logout>Çıkış yap</button>
        </div>
      </div>
      <div class="dashboard-layout">
        <nav class="side-tabs">
          ${["overview", "profile", "activities", "calendar", "bookings", "revenue", "messages", "new"].map((tab) => `<button class="tab-button ${state.vendorTab === tab ? "active" : ""}" data-vendor-tab="${tab}">${vendorTabLabel(tab)}</button>`).join("")}
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
    messages: "Mesajlar",
    profile: "Firma profili",
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
  if (state.vendorTab === "messages") return vendorMessagesPanel(vendor);
  if (state.vendorTab === "profile") return vendorProfileEditPanel(vendor);
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
          <thead><tr><th>Etkinlik</th><th>Seans</th><th>Satın alan</th><th>Katılımcı çocuk</th><th>Tutar</th><th>Durum</th><th>Aksiyon</th></tr></thead>
          <tbody>${
            bookings.length
              ? bookings.map((booking) => {
                  const { activity, session } = getSession(booking.sessionId);
                  return `<tr><td>${activity.title}</td><td>${dateTime(session.start)}</td><td>${booking.buyerName || booking.buyerEmail || "-"}</td><td>${bookingParticipantSummary(booking)}</td><td>${money(booking.totalAmount)}</td><td>${statusPill(booking.status)}</td><td><div class="button-row"><button class="ghost-action" data-detail="${activity.id}">Etkinlik</button>${canCancelBooking(booking) ? `<button class="ghost-action danger-action" data-cancel-booking="${booking.id}">İptal et</button>` : ""}</div></td></tr>`;
                }).join("")
              : `<tr><td colspan="7">Henüz rezervasyon yok.</td></tr>`
          }</tbody>
        </table>
      </div>
    </div>
  `;
}

function revenuePanel(bookings) {
  const vendor = currentVendor();
  const expenses = state.vendorExpenses.filter((expense) => expense.vendorId === vendor?.id);
  const editingExpense = expenses.find((expense) => expense.id === state.editingExpenseId);
  const gross = bookings.reduce((sum, booking) => sum + booking.totalAmount, 0);
  const commission = bookings.reduce((sum, booking) => sum + booking.commissionAmount, 0);
  const expenseTotal = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  return `
    <div class="panel">
      <h3>Gelir özeti</h3>
      <div class="metrics-grid">
        <div class="metric-card"><span>Brüt satış</span><strong>${money(gross)}</strong></div>
        <div class="metric-card"><span>Platform komisyonu</span><strong>${money(commission)}</strong></div>
        <div class="metric-card"><span>Giderler</span><strong>${money(expenseTotal)}</strong></div>
        <div class="metric-card"><span>Net hak ediş</span><strong>${money(gross - commission - expenseTotal)}</strong></div>
        <div class="metric-card"><span>İade</span><strong>${money(0)}</strong></div>
      </div>
      <form id="expenseForm" class="form-grid">
        <input type="hidden" name="expenseId" value="${editingExpense?.id ?? ""}" />
        <label><span>Gider başlığı</span><input name="title" required placeholder="Malzeme alımı" value="${editingExpense?.title ?? ""}" /></label>
        <label><span>Tutar</span><input name="amount" type="number" min="0" step="1" required placeholder="1500" value="${editingExpense?.amount ?? ""}" /></label>
        <label><span>Tarih</span><input name="expenseDate" type="date" value="${(editingExpense?.expenseDate ?? new Date().toISOString()).slice(0, 10)}" /></label>
        <label class="wide"><span>Açıklama</span><textarea name="description" placeholder="Fatura, malzeme veya operasyon notu">${editingExpense?.description ?? ""}</textarea></label>
        <div class="wide button-row">
          <button class="ghost-action" type="submit">${editingExpense ? "Gideri güncelle" : "Gider ekle"}</button>
          ${editingExpense ? `<button class="ghost-action" type="button" data-cancel-expense-edit>Düzenlemeyi iptal et</button>` : ""}
        </div>
      </form>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Başlık</th><th>Tarih</th><th>Tutar</th><th>Açıklama</th><th>Aksiyon</th></tr></thead>
          <tbody>${
            expenses.length
              ? expenses
                  .map(
                    (expense) => `
                      <tr>
                        <td>${expense.title}</td>
                        <td>${expense.expenseDate ? dateTime(expense.expenseDate).split(" ")[0] : "-"}</td>
                        <td>${money(expense.amount)}</td>
                        <td>${expense.description || "-"}</td>
                        <td><div class="button-row"><button class="ghost-action" data-edit-expense="${expense.id}">Düzenle</button><button class="ghost-action danger-action" data-delete-expense="${expense.id}">Sil</button></div></td>
                      </tr>
                    `,
                  )
                  .join("")
              : `<tr><td colspan="5">Henüz gider kaydı yok.</td></tr>`
          }</tbody>
        </table>
      </div>
    </div>
  `;
}

function conversationMessages(vendorId) {
  return state.vendorMessages.filter((message) => message.vendorId === vendorId);
}

function unreadConversationCount(vendorId, role) {
  return conversationMessages(vendorId).filter((message) =>
    role === "admin" ? message.senderRole === "vendor" && !message.readByAdmin : message.senderRole === "admin" && !message.readByVendor,
  ).length;
}

function vendorMessagesPanel(vendor) {
  setTimeout(() => markConversationRead(vendor.id), 0);
  return `
    <div class="panel">
      <div class="panel-heading">
        <div>
          <h3>Admin mesajları</h3>
          <p class="muted">Admin ekibiyle hızlı operasyon görüşmesi.</p>
        </div>
      </div>
      ${messageThread(vendor.id)}
    </div>
  `;
}

function adminMessagesPanel() {
  const selectedVendor = state.vendors.find((vendor) => vendor.id === state.selectedMessageVendorId) || state.vendors[0];
  if (selectedVendor && state.selectedMessageVendorId !== selectedVendor.id) state.selectedMessageVendorId = selectedVendor.id;
  if (selectedVendor) setTimeout(() => markConversationRead(selectedVendor.id), 0);
  return `
    <div class="messages-layout">
      <aside class="panel conversation-list">
        <h3>Satıcılar</h3>
        ${state.vendors
          .map((vendor) => {
            const messages = conversationMessages(vendor.id);
            const lastMessage = messages[messages.length - 1];
            const unread = unreadConversationCount(vendor.id, "admin");
            return `
              <button class="conversation-item ${selectedVendor?.id === vendor.id ? "active" : ""}" data-open-vendor-chat="${vendor.id}">
                <strong>${vendor.name}</strong>
                <span>${lastMessage?.body || "Henüz mesaj yok"}</span>
                ${unread ? `<b>${unread}</b>` : ""}
              </button>
            `;
          })
          .join("")}
      </aside>
      <section class="panel">
        ${
          selectedVendor
            ? `<div class="panel-heading"><div><h3>${selectedVendor.name}</h3><p class="muted">Satıcı mesajlaşması</p></div>${statusPill(selectedVendor.status)}</div>${messageThread(selectedVendor.id)}`
            : `<div class="empty-state">Mesajlaşma için firma yok.</div>`
        }
      </section>
    </div>
  `;
}

function messageThread(vendorId) {
  const messages = conversationMessages(vendorId);
  return `
    <div class="message-thread">
      ${
        messages.length
          ? messages
              .map(
                (message) => `
                  <div class="chat-bubble ${message.senderRole === (isAdmin() ? "admin" : "vendor") ? "mine" : ""}">
                    <strong>${message.senderRole === "admin" ? "Admin" : message.senderName || getVendor(message.vendorId)?.name || "Satıcı"}</strong>
                    <p>${message.body}</p>
                    <span>${dateTime(message.createdAt)}</span>
                  </div>
                `,
              )
              .join("")
          : `<div class="empty-state">Henüz mesaj yok. İlk mesajı yazabilirsiniz.</div>`
      }
    </div>
    <form id="vendorMessageForm" class="message-form">
      <input type="hidden" name="vendorId" value="${vendorId}" />
      <textarea name="body" required placeholder="Mesaj yazın"></textarea>
      <button class="primary-action" type="submit">Gönder</button>
    </form>
  `;
}

function vendorProfileEditPanel(vendor) {
  return `
    <div class="panel">
      <div class="panel-heading">
        <div>
          <h3>Firma profili</h3>
          <p class="muted">Bu bilgiler satıcı hesabınızın panelinde ve ileride public firma sayfanızda kullanılır.</p>
        </div>
        <span class="vendor-logo-thumb large">${vendor.logoUrl ? `<img src="${vendor.logoUrl}" alt="${vendor.name} logo" />` : userInitials()}</span>
      </div>
      <form id="vendorProfileForm" class="form-grid">
        <input type="hidden" name="vendorId" value="${vendor.id}" />
        <input type="hidden" name="currentLogoUrl" value="${vendor.logoUrl || ""}" />
        <label><span>Firma adı</span><input name="name" required value="${vendor.name || ""}" /></label>
        <label><span>İlçe</span><input name="district" required value="${vendor.district || ""}" /></label>
        <label class="wide"><span>Adres</span><input name="address" value="${vendor.address || ""}" placeholder="Firma adresi" /></label>
        <label class="wide"><span>Açıklama</span><textarea name="description" placeholder="Firmanızı kısa anlatın">${vendor.description || ""}</textarea></label>
        <label class="wide"><span>Yuvarlak logo</span><input name="logo" type="file" accept="image/*" data-preview-target="vendorLogoPreview" /></label>
        <div class="wide media-grid" id="vendorLogoPreview">
          ${vendor.logoUrl ? `<div class="media-thumb"><img src="${vendor.logoUrl}" alt="${vendor.name} logo önizleme" /><span>Mevcut logo</span></div>` : ""}
        </div>
        <button class="primary-action wide" type="submit">Firma profilini kaydet</button>
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
        <label><span>Kategori</span><select name="category">${state.categories.map((item) => `<option ${editingActivity?.category === item ? "selected" : ""}>${item}</option>`).join("")}</select></label>
        <label><span>Katılım şekli</span><select name="deliveryMode"><option value="physical" ${editingActivity?.deliveryMode !== "online" && editingActivity?.deliveryMode !== "hybrid" ? "selected" : ""}>Fiziksel</option><option value="online" ${editingActivity?.deliveryMode === "online" ? "selected" : ""}>Online - Google Meet</option><option value="hybrid" ${editingActivity?.deliveryMode === "hybrid" ? "selected" : ""}>Hibrit</option></select></label>
        <label><span>Katılım tipi</span><select name="participationType"><option value="group" ${editingActivity?.participationType !== "private" ? "selected" : ""}>Toplu etkinlik</option><option value="private" ${editingActivity?.participationType === "private" ? "selected" : ""}>Bire bir etkinlik</option></select></label>
        <label><span>Min yaş</span><input name="minAge" type="number" min="0" max="12" value="${editingActivity?.minAge ?? 5}" /></label>
        <label><span>Max yaş</span><input name="maxAge" type="number" min="0" max="12" value="${editingActivity?.maxAge ?? 8}" /></label>
        <label><span>İlçe</span><input name="district" value="${editingActivity?.district ?? vendor.district}" /></label>
        <label><span>Mekan / işletme adı</span><input name="locationQuery" value="${editingActivity?.locationQuery ?? editingActivity?.address ?? ""}" placeholder="Online etkinlikte boş kalabilir" /></label>
        <label class="wide"><span>Adres notu</span><input name="address" value="${editingActivity?.address ?? ""}" placeholder="Kat, salon, buluşma noktası gibi ek bilgi" /></label>
        <label class="wide"><span>Google Meet linki (demo)</span><input name="meetingUrl" value="${editingActivity?.meetingUrl ?? ""}" placeholder="Boş kalırsa demo link otomatik üretilir" /></label>
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
        <label class="wide"><span>Satın alma sonrası kullanıcıya gösterilecek not</span><textarea name="vendorNote" placeholder="Örn. Etkinlikten 10 dakika önce geliniz, yanınızda çorap getiriniz...">${editingActivity?.vendorNote ?? ""}</textarea></label>
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
  const deliveryMode = String(data.get("deliveryMode") || "physical");
  const rawMeetingUrl = String(data.get("meetingUrl") || "").trim();
  const title = String(data.get("title") || "").trim();
  const meetingUrl = ["online", "hybrid"].includes(deliveryMode) ? rawMeetingUrl || demoMeetUrl(title) : "";
  const locationQuery = String(data.get("locationQuery") || "").trim() || (deliveryMode === "online" ? "Online" : "");
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
    title,
    category: data.get("category"),
    type: deliveryMode === "online" ? "Online etkinlik" : sessions.length > 1 ? "Çoklu seans" : "Tek seans",
    deliveryMode,
    meetingUrl,
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
    vendorNote: String(data.get("vendorNote") || "").trim(),
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
        vendor_note: String(data.get("vendorNote") || "").trim(),
        min_age: Number(data.get("minAge")),
        max_age: Number(data.get("maxAge")),
        activity_type: deliveryMode === "online" ? "Online etkinlik" : sessions.length > 1 ? "Çoklu seans" : "Tek seans",
        delivery_mode: deliveryMode,
        meeting_url: meetingUrl,
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

async function updateVendorProfile(form) {
  const data = new FormData(form);
  const vendorId = String(data.get("vendorId"));
  const vendor = state.vendors.find((item) => item.id === vendorId);
  if (!vendor) return;

  const logoFile = form.elements.logo?.files?.[0];
  let logoUrl = String(data.get("currentLogoUrl") || vendor.logoUrl || "");
  if (logoFile && !state.supabaseReady) logoUrl = await fileToDataUrl(logoFile);
  if (logoFile && state.supabaseReady) {
    try {
      logoUrl = await uploadActivityImage(logoFile, vendorId);
    } catch (error) {
      notify(`Logo yüklenemedi: ${error.message}`);
    }
  }

  Object.assign(vendor, {
    name: String(data.get("name") || "").trim(),
    district: String(data.get("district") || "").trim(),
    address: String(data.get("address") || "").trim(),
    description: String(data.get("description") || "").trim(),
    logoUrl,
  });

  if (state.supabaseReady && isUuid(vendorId)) {
    const { error } = await state.supabaseClient
      .from("vendors")
      .update({
        name: vendor.name,
        district: vendor.district,
        address: vendor.address,
        description: vendor.description,
        logo_url: logoUrl,
      })
      .eq("id", vendorId);
    if (error) notify(`Firma profili yerelde güncellendi; Supabase kaydı başarısız: ${error.message}`);
  }

  notify("Firma profili güncellendi.");
  renderVendor();
}

async function saveVendorExpense(form) {
  const vendor = currentVendor();
  if (!vendor) {
    notify("Gider eklemek için satıcı hesabı gerekli.");
    return;
  }
  const data = new FormData(form);
  const expenseId = String(data.get("expenseId") || "");
  const expense = {
    id: expenseId || `exp-${Date.now()}`,
    vendorId: vendor.id,
    title: String(data.get("title") || "").trim(),
    amount: Number(data.get("amount") || 0),
    description: String(data.get("description") || "").trim(),
    expenseDate: String(data.get("expenseDate") || new Date().toISOString().slice(0, 10)),
    vendorName: vendor.name,
    createdAt: new Date().toISOString(),
  };
  if (!expense.title || expense.amount < 0) {
    notify("Gider başlığı ve tutarı geçerli olmalı.");
    return;
  }

  if (expenseId) {
    state.vendorExpenses = state.vendorExpenses.map((item) => (item.id === expenseId ? { ...item, ...expense } : item));
  } else {
    state.vendorExpenses.unshift(expense);
  }
  state.editingExpenseId = null;
  notify(expenseId ? "Gider güncelleniyor..." : "Gider kaydediliyor...");
  renderVendor();

  if (state.supabaseReady && isUuid(vendor.id)) {
    const payload = {
      vendor_id: vendor.id,
      title: expense.title,
      amount: expense.amount,
      description: expense.description,
      expense_date: expense.expenseDate,
    };
    const request = expenseId && isUuid(expenseId)
      ? state.supabaseClient.from("vendor_expenses").update(payload).eq("id", expenseId).select("*").single()
      : state.supabaseClient.from("vendor_expenses").insert(payload).select("*").single();
    const { data: savedExpense, error } = await request;
    if (error) {
      notify(`Gider yerelde işlendi; Supabase kaydı başarısız: ${error.message}`);
      return;
    }
    if (savedExpense) {
      const normalized = {
        id: savedExpense.id,
        vendorId: savedExpense.vendor_id,
        title: savedExpense.title,
        amount: Number(savedExpense.amount || 0),
        description: savedExpense.description || "",
        expenseDate: savedExpense.expense_date,
        vendorName: vendor.name,
        createdAt: savedExpense.created_at,
      };
      state.vendorExpenses = [normalized, ...state.vendorExpenses.filter((item) => item.id !== expense.id && item.id !== normalized.id)];
    }
  }

  notify(expenseId ? "Gider güncellendi." : "Gider eklendi.");
  renderVendor();
}

async function deleteVendorExpense(id) {
  const expense = state.vendorExpenses.find((item) => item.id === id);
  if (!expense) return;
  state.vendorExpenses = state.vendorExpenses.filter((item) => item.id !== id);
  if (state.editingExpenseId === id) state.editingExpenseId = null;
  notify("Gider siliniyor...");
  renderVendor();

  if (state.supabaseReady && isUuid(id)) {
    const { error } = await state.supabaseClient.from("vendor_expenses").delete().eq("id", id);
    if (error) {
      state.vendorExpenses.unshift(expense);
      notify(`Gider silinemedi: ${error.message}`);
      renderVendor();
      return;
    }
  }

  notify("Gider silindi.");
  renderVendor();
}

async function sendVendorMessage(form) {
  const data = new FormData(form);
  const vendorId = String(data.get("vendorId") || "");
  const body = String(data.get("body") || "").trim();
  if (!vendorId || !body) return;
  const vendor = getVendor(vendorId);
  const senderRole = isAdmin() ? "admin" : "vendor";
  const message = {
    id: `msg-${Date.now()}`,
    vendorId,
    vendorName: vendor?.name || "",
    senderId: state.currentUser?.id || "",
    senderName: state.authProfile?.full_name || state.currentUser?.email || "",
    senderRole,
    body,
    readByAdmin: senderRole === "admin",
    readByVendor: senderRole === "vendor",
    createdAt: new Date().toISOString(),
  };
  state.vendorMessages.push(message);
  form.reset();
  notify("Mesaj gönderildi.");
  isAdmin() ? renderAdmin() : renderVendor();

  if (state.supabaseReady && isUuid(vendorId)) {
    const { data: savedMessage, error } = await state.supabaseClient
      .from("vendor_messages")
      .insert({
        vendor_id: vendorId,
        sender_id: state.currentUser.id,
        sender_role: senderRole,
        body,
        read_by_admin: senderRole === "admin",
        read_by_vendor: senderRole === "vendor",
      })
      .select("*, vendor:vendors(name), sender:profiles(full_name, email)")
      .single();
    if (error) {
      notify(`Mesaj yerelde gönderildi; Supabase kaydı başarısız: ${error.message}`);
      return;
    }
    if (savedMessage) {
      state.vendorMessages = state.vendorMessages.filter((item) => item.id !== message.id);
      state.vendorMessages.push({
        id: savedMessage.id,
        vendorId: savedMessage.vendor_id,
        vendorName: savedMessage.vendor?.name || "",
        senderId: savedMessage.sender_id,
        senderName: savedMessage.sender?.full_name || savedMessage.sender?.email || "",
        senderRole: savedMessage.sender_role,
        body: savedMessage.body,
        readByAdmin: Boolean(savedMessage.read_by_admin),
        readByVendor: Boolean(savedMessage.read_by_vendor),
        createdAt: savedMessage.created_at,
      });
    }
  }

  isAdmin() ? renderAdmin() : renderVendor();
}

async function markConversationRead(vendorId) {
  if (!vendorId || !state.currentUser) return;
  const role = isAdmin() ? "admin" : isVendor() ? "vendor" : "";
  if (!role) return;
  let changed = false;
  state.vendorMessages = state.vendorMessages.map((message) => {
    if (message.vendorId !== vendorId) return message;
    if (role === "admin" && message.senderRole === "vendor" && !message.readByAdmin) {
      changed = true;
      return { ...message, readByAdmin: true };
    }
    if (role === "vendor" && message.senderRole === "admin" && !message.readByVendor) {
      changed = true;
      return { ...message, readByVendor: true };
    }
    return message;
  });
  if (!changed) return;
  updateNav();
  if (state.supabaseReady && isUuid(vendorId)) {
    const column = role === "admin" ? "read_by_admin" : "read_by_vendor";
    await state.supabaseClient.from("vendor_messages").update({ [column]: true }).eq("vendor_id", vendorId).neq("sender_role", role);
  }
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
          <button class="primary-action danger-action" data-logout>Admin çıkış</button>
          <span class="tag">PaymentProvider: DummyPOS</span>
        </div>
      </div>
      <div class="dashboard-layout">
        <nav class="side-tabs">
          ${["approvals", "vendors", "messages", "site", "admins", "payments", "commissions", "categories", "support"].map((tab) => `<button class="tab-button ${state.adminTab === tab ? "active" : ""}" data-admin-tab="${tab}">${adminTabLabel(tab)}</button>`).join("")}
        </nav>
        <div>${adminPanel()}</div>
      </div>
    </section>
  `;
}

function adminTabLabel(tab) {
  return { approvals: "Onaylar", vendors: "Firmalar", messages: "Satıcı mesajları", site: "Site ayarları", admins: "Alt adminler", payments: "Satılan etkinlikler", commissions: "Komisyonlar", categories: "Kategoriler", support: "Destek" }[tab];
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
  if (state.adminTab === "vendors") return adminVendorsPanel();
  if (state.adminTab === "messages") return adminMessagesPanel();
  if (state.adminTab === "site") return adminSitePanel();
  if (state.adminTab === "admins") return adminUsersPanel();
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

function adminVendorsPanel() {
  return `
    <div class="panel">
      <h3>Firmalar</h3>
      <div class="sessions">
        ${
          state.vendors.length
            ? state.vendors
                .map(
                  (vendor) => `
                    <div class="mini-card child-card">
                      <div>
                        <strong>${vendor.name}</strong>
                        <p class="muted">${vendor.district} · ${vendor.plan} · ${statusPill(vendor.status)}</p>
                      </div>
                      <div class="button-row">
                        ${vendor.status !== "approved" ? `<button class="primary-action" data-approve-vendor="${vendor.id}">Onayla</button>` : ""}
                        ${vendor.status !== "blocked" ? `<button class="ghost-action danger-action" data-block-vendor="${vendor.id}">Sistemden çıkar</button>` : `<button class="ghost-action" data-approve-vendor="${vendor.id}">Tekrar aktifleştir</button>`}
                      </div>
                    </div>
                  `,
                )
                .join("")
            : `<div class="empty-state">Firma kaydı yok.</div>`
        }
      </div>
    </div>
  `;
}

function adminSitePanel() {
  const editingSocial = state.socialLinks.find((link) => link.id === state.editingSocialId);
  const editingFooter = state.footerLinks.find((link) => link.id === state.editingFooterLinkId);
  return `
    <div class="detail-layout">
      <article class="panel">
        <h3>Site metinleri</h3>
        <form id="siteSettingsForm" class="form-grid">
          <label><span>Marka adı</span><input name="brandName" value="${state.siteSettings.brandName}" /></label>
          <label><span>Alt marka</span><input name="brandAccent" value="${state.siteSettings.brandAccent}" /></label>
          <label class="wide"><span>Hero başlık</span><input name="heroTitle" value="${state.siteSettings.heroTitle}" /></label>
          <label class="wide"><span>Hero metni</span><textarea name="heroText">${state.siteSettings.heroText}</textarea></label>
          <label class="wide"><span>Hakkımızda başlığı</span><input name="aboutTitle" value="${state.siteSettings.aboutTitle}" /></label>
          <label class="wide"><span>Hakkımızda metni</span><textarea name="aboutText">${state.siteSettings.aboutText}</textarea></label>
          <label><span>E-posta</span><input name="contactEmail" value="${state.siteSettings.contactEmail}" /></label>
          <label><span>Telefon</span><input name="contactPhone" value="${state.siteSettings.contactPhone}" /></label>
          <label class="wide"><span>Adres</span><input name="contactAddress" value="${state.siteSettings.contactAddress}" /></label>
          <button class="primary-action wide" type="submit">Site metinlerini kaydet</button>
        </form>
      </article>
      <aside class="panel">
        <h3>Sosyal medya</h3>
        <form id="socialLinkForm" class="form-grid">
          <input type="hidden" name="socialId" value="${editingSocial?.id ?? ""}" />
          <label><span>Platform</span><input name="platform" required value="${editingSocial?.platform ?? ""}" placeholder="Instagram" /></label>
          <label><span>URL</span><input name="url" required value="${editingSocial?.url ?? ""}" placeholder="https://..." /></label>
          <button class="ghost-action wide" type="submit">${editingSocial ? "Sosyal linki güncelle" : "Sosyal link ekle"}</button>
        </form>
        <div class="sessions">${state.socialLinks.map((link) => `<div class="mini-card child-card"><div><strong>${link.platform}</strong><p class="muted">${link.url}</p></div><div class="button-row"><button class="ghost-action" data-edit-social="${link.id}">Düzenle</button><button class="ghost-action danger-action" data-delete-social="${link.id}">Sil</button></div></div>`).join("")}</div>
      </aside>
      <article class="panel wide">
        <h3>Footer linkleri</h3>
        <form id="footerLinkForm" class="form-grid">
          <input type="hidden" name="footerLinkId" value="${editingFooter?.id ?? ""}" />
          <label><span>Başlık grubu</span><input name="group" required value="${editingFooter?.group ?? ""}" placeholder="Keşfet" /></label>
          <label><span>Link metni</span><input name="label" required value="${editingFooter?.label ?? ""}" placeholder="Online Kurslar" /></label>
          <label class="wide"><span>URL / bölüm</span><input name="url" required value="${editingFooter?.url ?? ""}" placeholder="#results" /></label>
          <button class="ghost-action wide" type="submit">${editingFooter ? "Footer linkini güncelle" : "Footer link ekle"}</button>
        </form>
        <div class="sessions">${state.footerLinks.map((link) => `<div class="mini-card child-card"><div><strong>${link.group} · ${link.label}</strong><p class="muted">${link.url}</p></div><div class="button-row"><button class="ghost-action" data-edit-footer-link="${link.id}">Düzenle</button><button class="ghost-action danger-action" data-delete-footer-link="${link.id}">Sil</button></div></div>`).join("")}</div>
      </article>
    </div>
  `;
}

function adminUsersPanel() {
  return `
    <div class="panel">
      <h3>Alt adminler</h3>
      <form id="adminUserForm" class="form-grid">
        <label class="wide"><span>E-posta</span><input name="email" type="email" required placeholder="yonetici@mail.com" /></label>
        <button class="primary-action wide" type="submit">Admin yetkisi ver</button>
      </form>
      <div class="sessions">
        ${state.adminEmails.map((email) => `<div class="mini-card child-card"><strong>${email}</strong><span class="tag">admin</span></div>`).join("")}
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

async function blockVendor(id) {
  const vendor = state.vendors.find((item) => item.id === id);
  if (vendor) vendor.status = "blocked";
  if (state.supabaseReady && isUuid(id)) {
    await state.supabaseClient.from("vendors").update({ status: "blocked" }).eq("id", id);
  }
  notify("Firma sistemden çıkarıldı.");
  renderAdmin();
}

async function addAdminUser(form) {
  const email = String(new FormData(form).get("email") || "").trim().toLowerCase();
  if (!email) return;
  if (!state.adminEmails.includes(email)) state.adminEmails.push(email);
  if (state.supabaseReady) {
    await state.supabaseClient.from("admin_users").upsert({ email, status: "active", created_by: state.currentUser.id });
    await state.supabaseClient.from("profiles").update({ role: "admin", status: "active" }).eq("email", email);
  }
  notify(`${email} admin olarak yetkilendirildi.`);
  renderAdmin();
}

async function saveSiteSettings(form) {
  const data = new FormData(form);
  Object.keys(state.siteSettings).forEach((key) => {
    state.siteSettings[key] = String(data.get(key) || "").trim();
  });
  if (state.supabaseReady) {
    const rows = Object.entries(state.siteSettings).map(([key, value]) => ({ key, value }));
    const { error } = await state.supabaseClient.from("site_settings").upsert(rows, { onConflict: "key" });
    if (error) notify(`Site ayarları yerelde kaydedildi; Supabase hatası: ${error.message}`);
  }
  notify("Site ayarları kaydedildi.");
  renderAdmin();
}

async function saveSocialLink(form) {
  const data = new FormData(form);
  const id = String(data.get("socialId") || "") || `social-${Date.now()}`;
  const link = { id, platform: String(data.get("platform") || "").trim(), url: String(data.get("url") || "").trim(), isActive: true };
  if (!link.platform || !link.url) return;
  state.socialLinks = state.socialLinks.some((item) => item.id === id) ? state.socialLinks.map((item) => (item.id === id ? link : item)) : [...state.socialLinks, link];
  state.editingSocialId = null;
  if (state.supabaseReady) {
    const payload = { platform: link.platform, url: link.url, is_active: true };
    const request = isUuid(id)
      ? state.supabaseClient.from("social_links").update(payload).eq("id", id)
      : state.supabaseClient.from("social_links").insert(payload);
    const { error } = await request;
    if (error) notify(`Sosyal link yerelde kaydedildi; Supabase hatası: ${error.message}`);
    else await loadSiteSettings();
  }
  notify("Sosyal medya linki kaydedildi.");
  renderAdmin();
}

async function deleteSocialLink(id) {
  state.socialLinks = state.socialLinks.filter((link) => link.id !== id);
  if (state.editingSocialId === id) state.editingSocialId = null;
  if (state.supabaseReady && isUuid(id)) await state.supabaseClient.from("social_links").delete().eq("id", id);
  notify("Sosyal medya linki silindi.");
  renderAdmin();
}

async function saveFooterLink(form) {
  const data = new FormData(form);
  const id = String(data.get("footerLinkId") || "") || `footer-${Date.now()}`;
  const link = {
    id,
    group: String(data.get("group") || "").trim(),
    label: String(data.get("label") || "").trim(),
    url: String(data.get("url") || "").trim(),
    isActive: true,
  };
  if (!link.group || !link.label || !link.url) return;
  state.footerLinks = state.footerLinks.some((item) => item.id === id) ? state.footerLinks.map((item) => (item.id === id ? link : item)) : [...state.footerLinks, link];
  state.editingFooterLinkId = null;
  if (state.supabaseReady) {
    const payload = { link_group: link.group, label: link.label, url: link.url, is_active: true };
    const request = isUuid(id)
      ? state.supabaseClient.from("footer_links").update(payload).eq("id", id)
      : state.supabaseClient.from("footer_links").insert(payload);
    const { error } = await request;
    if (error) notify(`Footer linki yerelde kaydedildi; Supabase hatası: ${error.message}`);
    else await loadSiteSettings();
  }
  notify("Footer linki kaydedildi.");
  renderAdmin();
}

async function deleteFooterLink(id) {
  state.footerLinks = state.footerLinks.filter((link) => link.id !== id);
  if (state.editingFooterLinkId === id) state.editingFooterLinkId = null;
  if (state.supabaseReady && isUuid(id)) await state.supabaseClient.from("footer_links").delete().eq("id", id);
  notify("Footer linki silindi.");
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
        city: "İstanbul",
        address: "",
        description: "",
        logoUrl: "",
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
  if (state.autoRefreshTimer) clearInterval(state.autoRefreshTimer);
  if (state.messageRefreshTimer) clearInterval(state.messageRefreshTimer);
  state.autoRefreshTimer = null;
  state.messageRefreshTimer = null;
  state.currentUser = null;
  state.authProfile = null;
  state.vendorIds = [];
  state.favorites = new Set();
  state.readNotifications = new Set();
  state.knownNotificationIds = new Set();
  state.notificationBaselineReady = false;
  state.notificationOpen = false;
  state.authMode = "choice";
  state.editingChildId = null;
  state.editingExpenseId = null;
  state.editingSocialId = null;
  state.editingFooterLinkId = null;
  state.selectedMessageVendorId = null;
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
    interests: data.getAll("interests").map(String),
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

document.addEventListener("click", async (event) => {
  unlockNotificationSound();
  const target = event.target.closest("button, a");
  if (!target) return;

  if (target.dataset.route) setRoute(target.dataset.route);
  if (target.dataset.scroll) document.querySelector(`#${target.dataset.scroll}`)?.scrollIntoView({ behavior: "smooth" });
  if (target.dataset.detail) setRoute("detail", target.dataset.detail);
  if (target.dataset.vendorDetail) setRoute("vendorDetail", target.dataset.vendorDetail);
  if (target.hasAttribute("data-close-modal")) target.closest(".message-modal")?.remove();
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
    state.editingExpenseId = null;
    renderVendor();
  }
  if (target.dataset.openVendorChat) {
    state.selectedMessageVendorId = target.dataset.openVendorChat;
    state.adminTab = "messages";
    renderAdmin();
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
  if (target.dataset.editExpense) {
    state.editingExpenseId = target.dataset.editExpense;
    state.vendorTab = "revenue";
    renderVendor();
  }
  if (target.dataset.deleteExpense) await deleteVendorExpense(target.dataset.deleteExpense);
  if (target.hasAttribute("data-cancel-expense-edit")) {
    state.editingExpenseId = null;
    renderVendor();
  }
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
  if (target.dataset.blockVendor) {
    blockVendor(target.dataset.blockVendor);
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
  if (target.dataset.cancelBooking) cancelBooking(target.dataset.cancelBooking);
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
    if (state.supabaseReady) state.supabaseClient.from("categories").delete().eq("name", target.dataset.deleteCategory);
    state.categories = state.categories.filter((item) => item !== target.dataset.deleteCategory);
    renderAdmin();
  }
  if (target.dataset.editCategory) {
    const nextName = prompt("Kategori adı", target.dataset.editCategory);
    if (nextName) {
      if (state.supabaseReady) {
        state.supabaseClient
          .from("categories")
          .update({ name: nextName, slug: slugify(nextName) })
          .eq("name", target.dataset.editCategory);
      }
      state.categories = state.categories.map((item) => (item === target.dataset.editCategory ? nextName : item));
      renderAdmin();
    }
  }
  if (target.dataset.editSocial) {
    state.editingSocialId = target.dataset.editSocial;
    state.adminTab = "site";
    renderAdmin();
  }
  if (target.dataset.deleteSocial) await deleteSocialLink(target.dataset.deleteSocial);
  if (target.dataset.editFooterLink) {
    state.editingFooterLinkId = target.dataset.editFooterLink;
    state.adminTab = "site";
    renderAdmin();
  }
  if (target.dataset.deleteFooterLink) await deleteFooterLink(target.dataset.deleteFooterLink);
  if (target.dataset.categoryFilter) {
    const form = app.querySelector("#filters");
    if (form?.elements.category) {
      form.elements.category.value = target.dataset.categoryFilter;
      app.querySelector("#results")?.scrollIntoView({ behavior: "smooth" });
      renderActivityGrid(filterActivities(new FormData(form)));
    }
  }
  if (target.dataset.searchTag) {
    const form = app.querySelector("#filters");
    if (form?.elements.category) {
      form.elements.category.value = target.dataset.searchTag;
      app.querySelector("#results")?.scrollIntoView({ behavior: "smooth" });
      renderActivityGrid(filterActivities(new FormData(form)));
    }
  }
});

document.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (event.target.id === "bookingForm") await createBooking(event.target);
  if (event.target.id === "reviewForm") await createReview(event.target);
  if (event.target.id === "activityForm") await createActivity(event.target);
  if (event.target.id === "vendorProfileForm") await updateVendorProfile(event.target);
  if (event.target.id === "expenseForm") await saveVendorExpense(event.target);
  if (event.target.id === "vendorMessageForm") await sendVendorMessage(event.target);
  if (event.target.id === "adminUserForm") await addAdminUser(event.target);
  if (event.target.id === "siteSettingsForm") await saveSiteSettings(event.target);
  if (event.target.id === "socialLinkForm") await saveSocialLink(event.target);
  if (event.target.id === "footerLinkForm") await saveFooterLink(event.target);
  if (event.target.id === "loginForm") await handleLogin(event.target);
  if (event.target.id === "signupForm") await handleSignup(event.target);
  if (event.target.id === "childForm") await handleChildCreate(event.target);
  if (event.target.id === "categoryForm") {
    const name = new FormData(event.target).get("name");
    if (name && !state.categories.includes(name)) {
      state.categories.push(String(name));
      if (state.supabaseReady) await state.supabaseClient.from("categories").upsert({ name: String(name), slug: slugify(name) }, { onConflict: "slug" });
    }
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
  if (event.target.id === "newsletterForm") {
    notify("Bülten kaydınız alındı.");
    event.target.reset();
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
