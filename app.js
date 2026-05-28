const ADMIN_EMAIL = "esinaykanat@gmail.com";

const state = {
  route: "home",
  selectedActivityId: null,
  vendorTab: "overview",
  adminTab: "approvals",
  currentUser: null,
  authProfile: null,
  supabaseClient: null,
  supabaseReady: false,
  favorites: new Set(["act-art-1"]),
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
      minAge: 5,
      maxAge: 9,
      district: "Kadıköy",
      price: 650,
      status: "approved",
      visual: "linear-gradient(135deg, #0f766e, #e85d45 55%, #d99b22)",
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
      minAge: 7,
      maxAge: 12,
      district: "Beşiktaş",
      price: 900,
      status: "approved",
      visual: "linear-gradient(135deg, #2563eb, #0f766e 52%, #f5c451)",
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
      minAge: 1,
      maxAge: 3,
      district: "Kadıköy",
      price: 420,
      status: "approved",
      visual: "linear-gradient(135deg, #f97316, #0ea5e9 55%, #84cc16)",
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
      minAge: 6,
      maxAge: 10,
      district: "Beyoğlu",
      price: 780,
      status: "pending",
      visual: "linear-gradient(135deg, #7c3aed, #e85d45 58%, #facc15)",
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

  const hasConfig =
    config?.url &&
    config?.anonKey &&
    !String(config.url).includes("YOUR_SUPABASE") &&
    !String(config.anonKey).includes("YOUR_SUPABASE");

  if (!hasConfig || !window.supabase?.createClient) {
    state.supabaseReady = false;
    return;
  }

  state.supabaseClient = window.supabase.createClient(config.url, config.anonKey);
  state.supabaseReady = true;

  const { data } = await state.supabaseClient.auth.getSession();
  if (data.session?.user) await setSupabaseUser(data.session.user);
  await loadMarketplaceData();

  state.supabaseClient.auth.onAuthStateChange(async (_event, session) => {
    await setSupabaseUser(session?.user ?? null);
    await loadMarketplaceData();
    render();
  });
}

async function setSupabaseUser(user) {
  state.currentUser = user;
  state.authProfile = null;
  if (!user || !state.supabaseClient) return;

  const { data } = await state.supabaseClient.from("profiles").select("*").eq("id", user.id).maybeSingle();
  state.authProfile = data ?? {
    id: user.id,
    email: user.email,
    role: user.email === ADMIN_EMAIL ? "admin" : user.user_metadata?.role ?? "parent",
    full_name: user.user_metadata?.full_name ?? user.email,
  };
}

function isAdmin() {
  return state.currentUser?.email === ADMIN_EMAIL;
}

function isVendor() {
  return state.authProfile?.role === "vendor";
}

function isParent() {
  return state.authProfile?.role === "parent" || isAdmin();
}

function profileLabel() {
  if (!state.currentUser) return "Giriş";
  if (isAdmin()) return "Admin";
  if (isVendor()) return "Satıcı";
  return "Profil";
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

  if (vendors?.length) {
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

  if (activities?.length) {
    state.activities = activities.map((activity, index) => ({
      id: activity.id,
      vendorId: activity.vendor_id,
      title: activity.title,
      category: activity.category?.name ?? "Etkinlik",
      type: activity.activity_type,
      minAge: activity.min_age,
      maxAge: activity.max_age,
      district: activity.district,
      price: Number(activity.sessions?.[0]?.price ?? 0),
      status: activity.status,
      visual: visualForIndex(index),
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

function setRoute(route, id) {
  state.route = route;
  state.selectedActivityId = id ?? state.selectedActivityId;
  document.querySelector(".primary-nav")?.classList.remove("open");
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

function updateNav() {
  const adminButton = document.querySelector('[data-route="admin"]');
  const authButton = document.querySelector("#authNav");
  if (adminButton) adminButton.hidden = !isAdmin();
  if (authButton) authButton.textContent = profileLabel();

  document.querySelectorAll(".nav-link").forEach((button) => {
    button.classList.toggle("active", button.dataset.route === state.route);
  });
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
  };
  const [label, tone] = map[status] ?? [status, ""];
  return `<span class="status-pill ${tone}">${label}</span>`;
}

function render() {
  updateNav();

  if (state.route === "home") renderHome();
  if (state.route === "detail") renderDetail();
  if (state.route === "auth") renderAuth();
  if (state.route === "bookings") renderBookings();
  if (state.route === "vendor") renderVendor();
  if (state.route === "admin") renderAdmin();
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
            <h3>Hesap tipi</h3>
            <div class="tag-row">
              <span class="tag">Rol: ${state.authProfile?.role ?? "parent"}</span>
              <span class="tag">Admin mail: ${ADMIN_EMAIL}</span>
              <span class="tag">${state.supabaseReady ? "Veri Supabase'de" : "Yerel demo state"}</span>
            </div>
            ${isParent() ? parentProfilePanel() : ""}
            ${isVendor() ? vendorProfilePanel() : ""}
          </article>
          <aside class="panel">
            <h3>Panel kısayolları</h3>
            <div class="sessions">
              <button class="ghost-action" data-route="bookings">Ebeveyn rezervasyonları</button>
              <button class="ghost-action" data-route="vendor">Satıcı paneli</button>
              ${isAdmin() ? `<button class="primary-action" data-route="admin">Admin panel</button>` : ""}
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
          <h2>Ebeveyn ve satıcı hesapları ayrı ilerler</h2>
          <p class="muted">${modeLabel}. Supabase ayarı girildiğinde kayıt/giriş gerçek auth üzerinden yapılır.</p>
        </div>
      </div>
      <div class="detail-layout">
        <article class="panel">
          <h3>Giriş yap</h3>
          <form id="loginForm" class="form-grid">
            <label class="wide"><span>E-posta</span><input name="email" type="email" required placeholder="ornek@mail.com" /></label>
            <label class="wide"><span>Şifre</span><input name="password" type="password" required minlength="6" placeholder="En az 6 karakter" /></label>
            <button class="primary-action wide" type="submit">Giriş yap</button>
          </form>
          <p class="muted">Admin paneli sadece ${ADMIN_EMAIL} hesabıyla görünür.</p>
        </article>
        <article class="panel">
          <h3>Yeni üyelik</h3>
          <form id="signupForm" class="form-grid">
            <label><span>Ad soyad</span><input name="fullName" required placeholder="Adınız Soyadınız" /></label>
            <label><span>Hesap tipi</span><select name="role"><option value="parent">Ebeveyn</option><option value="vendor">Satıcı / firma</option></select></label>
            <label class="wide"><span>E-posta</span><input name="email" type="email" required placeholder="ornek@mail.com" /></label>
            <label class="wide"><span>Şifre</span><input name="password" type="password" required minlength="6" placeholder="En az 6 karakter" /></label>
            <label class="wide vendor-only"><span>Firma adı</span><input name="vendorName" placeholder="Firma / atölye adı" /></label>
            <button class="primary-action wide" type="submit">Üyelik oluştur</button>
          </form>
        </article>
      </div>
    </section>
  `;
}

function parentProfilePanel() {
  return `
    <h3>Çocuk profilleri</h3>
    <div class="sessions">
      ${state.children.map((child) => `<div class="mini-card"><strong>${child.name}</strong><p class="muted">${child.age} yaş · ${child.interests.join(", ")}</p></div>`).join("")}
    </div>
    <form id="childForm" class="form-grid">
      <label><span>Çocuk adı</span><input name="name" required placeholder="Ada" /></label>
      <label><span>Yaş</span><input name="age" type="number" min="0" max="12" required value="6" /></label>
      <label class="wide"><span>İlgi alanları</span><input name="interests" placeholder="Sanat, STEM" /></label>
      <button class="ghost-action wide" type="submit">Çocuk profili ekle</button>
    </form>
  `;
}

function vendorProfilePanel() {
  const vendor = state.vendors[0];
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
    form.elements.maxPrice.value = 2500;
    app.querySelector("#maxPriceLabel").textContent = money(2500);
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
      const remaining = activity.sessions.reduce((sum, session) => sum + (session.capacity - session.reserved), 0);
      return `
        <article class="activity-card">
          <div class="activity-visual" style="--visual:${activity.visual}">
            <strong>${activity.category}</strong>
          </div>
          <div class="activity-body">
            <div class="tag-row">
              <span class="tag">${activity.minAge}-${activity.maxAge} yaş</span>
              <span class="tag">${activity.district}</span>
              <span class="tag">${remaining} kontenjan</span>
            </div>
            <h3>${activity.title}</h3>
            <p class="muted">${vendor.name} · ${activity.type}</p>
            <div class="card-footer">
              <span class="price">${money(activity.price)}</span>
              <div class="button-row">
                <button class="icon-button ${state.favorites.has(activity.id) ? "active" : ""}" data-favorite="${activity.id}" title="Favori">♥</button>
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
  app.innerHTML = `
    <section class="section-shell">
      <button class="ghost-action" data-route="home">← Listeye dön</button>
      <div class="detail-header">
        <div>
          <p class="eyebrow">${activity.category}</p>
          <h2>${activity.title}</h2>
          <p class="muted">${vendor.name} · ${activity.district} · ${activity.minAge}-${activity.maxAge} yaş</p>
        </div>
        ${statusPill(activity.status)}
      </div>
      <div class="detail-layout">
        <article class="panel">
          <div class="detail-cover" style="--visual:${activity.visual}"></div>
          <h3>Etkinlik bilgileri</h3>
          <p>${activity.description}</p>
          <div class="tag-row">
            <span class="tag">${activity.type}</span>
            <span class="tag">${activity.parentParticipation}</span>
            <span class="tag">${activity.cancellation}</span>
          </div>
          <h3>Seanslar</h3>
          <div class="sessions">
            ${activity.sessions
              .map((session) => {
                const remaining = session.capacity - session.reserved;
                return `
                  <label class="session-row ${session.id === firstAvailable?.id ? "selected" : ""}">
                    <span>
                      <strong>${dateTime(session.start)}</strong>
                      <span class="muted">${remaining} kontenjan · ${money(session.price)}</span>
                    </span>
                    <input type="radio" name="session" value="${session.id}" ${session.id === firstAvailable?.id ? "checked" : ""} ${remaining <= 0 ? "disabled" : ""} />
                  </label>
                `;
              })
              .join("")}
          </div>
        </article>
        <aside class="panel">
          <p class="eyebrow">Rezervasyon</p>
          <h3>Çocuk ve ödeme bilgisi</h3>
          <form id="bookingForm" class="form-grid">
            <label class="wide">
              Katılımcı çocuk
              <select name="child">
                ${state.children.map((child) => `<option value="${child.id}">${child.name}, ${child.age} yaş</option>`).join("")}
              </select>
            </label>
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
            <button class="primary-action wide" type="submit">Rezervasyon oluştur</button>
          </form>
          <p class="muted">Başarılı online ödeme confirmed rezervasyon üretir; komisyon kaydı otomatik hesaplanır.</p>
        </aside>
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
  const sessionId = app.querySelector('input[name="session"]:checked')?.value;
  if (!sessionId) {
    notify("Uygun bir seans seçilmedi.");
    return;
  }
  const found = getSession(sessionId);
  const { activity, session } = found;
  if (session.reserved >= session.capacity) {
    notify("Bu seans için kontenjan kalmadı.");
    return;
  }
  const formData = new FormData(form);
  const vendor = getVendor(activity.vendorId);
  const paymentMethod = formData.get("paymentMethod");
  const status = paymentMethod === "online" ? "confirmed" : "confirmed";
  session.reserved += 1;
  const booking = {
    id: `book-${Date.now()}`,
    activityId: activity.id,
    sessionId,
    childId: formData.get("child"),
    status,
    paymentProvider: paymentMethod === "online" ? "DummyPOS" : "Yerinde ödeme",
    totalAmount: session.price,
    commissionRate: vendor.commissionRate,
    commissionAmount: Math.round(session.price * vendor.commissionRate),
    createdAt: new Date().toISOString(),
    notes: formData.get("notes"),
  };
  state.bookings.unshift(booking);

  if (state.supabaseReady && state.currentUser) {
    const { error } = await state.supabaseClient.from("bookings").insert({
      user_id: state.currentUser.id,
      session_id: sessionId,
      status: status,
      participant_count: 1,
      total_amount: session.price,
    });
    if (error) notify(`Demo rezervasyon oluştu; Supabase kaydı için backend RPC gerekir: ${error.message}`);
  }

  notify("Rezervasyon onaylandı, komisyon kaydı oluşturuldu.");
  setRoute("bookings");
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
  const child = state.children.find((item) => item.id === booking.childId);
  return `
    <article class="booking-card">
      <div class="panel-heading">
        <div>
          <h3>${activity.title}</h3>
          <p class="muted">${dateTime(session.start)} · ${child?.name ?? "Çocuk profili"}</p>
        </div>
        ${statusPill(booking.status)}
      </div>
      <div class="tag-row">
        <span class="tag">Ödeme: ${booking.paymentProvider}</span>
        <span class="tag">Tutar: ${money(booking.totalAmount)}</span>
        <span class="tag">Komisyon: ${money(booking.commissionAmount)}</span>
      </div>
    </article>
  `;
}

function renderVendor() {
  if (!state.currentUser || (!isVendor() && !isAdmin())) {
    renderAccessGate("Satıcı hesabı gerekli", "Satıcı paneli firma hesabıyla giriş yapan kullanıcılar içindir. Yeni satıcı hesabı açıldığında firma pending statüsünde admin onayı bekler.", "Satıcı girişi / kayıt");
    return;
  }
  const vendor = state.vendors[0];
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
      <h3>Etkinliklerim</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Etkinlik</th><th>Kategori</th><th>Yaş</th><th>Seans</th><th>Durum</th></tr></thead>
          <tbody>${activities.map((activity) => `<tr><td>${activity.title}</td><td>${activity.category}</td><td>${activity.minAge}-${activity.maxAge}</td><td>${activity.sessions.length}</td><td>${statusPill(activity.status)}</td></tr>`).join("")}</tbody>
        </table>
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
      <h3>Rezervasyon listesi</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Etkinlik</th><th>Seans</th><th>Tutar</th><th>Durum</th></tr></thead>
          <tbody>${
            bookings.length
              ? bookings.map((booking) => {
                  const { activity, session } = getSession(booking.sessionId);
                  return `<tr><td>${activity.title}</td><td>${dateTime(session.start)}</td><td>${money(booking.totalAmount)}</td><td>${statusPill(booking.status)}</td></tr>`;
                }).join("")
              : `<tr><td colspan="4">Henüz rezervasyon yok.</td></tr>`
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
  return `
    <div class="panel">
      <h3>Hızlı etkinlik oluştur</h3>
      <form id="activityForm" class="form-grid">
        <label><span>Başlık</span><input name="title" required placeholder="Yaratıcı drama atölyesi" /></label>
        <label><span>Kategori</span><select name="category">${["Oyun grubu", "Sanat atölyesi", "Spor", "Müzik", "Dans", "Drama", "Müze/gezi", "Bilim/STEM", "Doğa"].map((item) => `<option>${item}</option>`).join("")}</select></label>
        <label><span>Min yaş</span><input name="minAge" type="number" min="0" max="12" value="5" /></label>
        <label><span>Max yaş</span><input name="maxAge" type="number" min="0" max="12" value="8" /></label>
        <label><span>İlçe</span><input name="district" value="${vendor.district}" /></label>
        <label><span>Fiyat</span><input name="price" type="number" value="600" /></label>
        <label class="wide"><span>Açıklama</span><textarea name="description" required></textarea></label>
        <button class="primary-action wide" type="submit">Pending etkinlik oluştur</button>
      </form>
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
  const activity = {
    id: `act-${Date.now()}`,
    vendorId: "ven-1",
    title: data.get("title"),
    category: data.get("category"),
    type: "Tek seans",
    minAge: Number(data.get("minAge")),
    maxAge: Number(data.get("maxAge")),
    district: data.get("district"),
    price: Number(data.get("price")),
    status: "pending",
    visual: "linear-gradient(135deg, #0f766e, #2563eb 55%, #e85d45)",
    description: data.get("description"),
    cancellation: "Etkinlikten 24 saat öncesine kadar ücretsiz iptal.",
    parentParticipation: "Satıcı tarafından belirlenecek.",
    sessions: [{ id: `ses-${Date.now()}`, start: "2026-06-10T13:00:00", end: "2026-06-10T15:00:00", capacity: 10, reserved: 0, price: Number(data.get("price")), status: "active" }],
  };
  state.activities.unshift(activity);

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
      const { data: dbActivity, error } = await state.supabaseClient
        .from("activities")
        .insert({
          vendor_id: vendorId,
          category_id: category?.id ?? null,
          title: data.get("title"),
          slug: `${slugify(data.get("title"))}-${Date.now()}`,
          description: data.get("description"),
          min_age: Number(data.get("minAge")),
          max_age: Number(data.get("maxAge")),
          activity_type: "Tek seans",
          district: data.get("district"),
          status: "pending",
        })
        .select()
        .single();

      if (!error && dbActivity) {
        await state.supabaseClient.from("activity_sessions").insert({
          activity_id: dbActivity.id,
          start_at: "2026-06-10T13:00:00+03:00",
          end_at: "2026-06-10T15:00:00+03:00",
          capacity: 10,
          reserved_count: 0,
          price: Number(data.get("price")),
          status: "active",
        });
      }

      if (error) notify(`Yerel etkinlik oluştu; Supabase kaydı başarısız: ${error.message}`);
      await loadMarketplaceData();
    }
  }

  state.vendorTab = "activities";
  notify("Etkinlik pending durumunda oluşturuldu; admin onayı bekliyor.");
  renderVendor();
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
        <span class="tag">PaymentProvider: DummyPOS</span>
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
  return { approvals: "Onaylar", payments: "Ödemeler", commissions: "Komisyonlar", categories: "Kategoriler", support: "Destek" }[tab];
}

function adminPanel() {
  if (state.adminTab === "approvals") {
    const pendingVendors = state.vendors.filter((vendor) => vendor.status === "pending");
    const pendingActivities = state.activities.filter((activity) => activity.status === "pending");
    return `
      <div class="panel">
        <h3>Onay bekleyen firmalar</h3>
        ${pendingVendors.map((vendor) => `<div class="mini-card"><strong>${vendor.name}</strong><p class="muted">${vendor.district} · ${vendor.plan}</p><button class="primary-action" data-approve-vendor="${vendor.id}">Firmayı onayla</button></div>`).join("") || `<div class="empty-state">Firma onayı beklemiyor.</div>`}
        <h3>Onay bekleyen etkinlikler</h3>
        ${pendingActivities.map((activity) => `<div class="mini-card"><strong>${activity.title}</strong><p class="muted">${activity.category} · ${getVendor(activity.vendorId).name}</p><button class="primary-action" data-approve-activity="${activity.id}">Etkinliği onayla</button></div>`).join("") || `<div class="empty-state">Etkinlik onayı beklemiyor.</div>`}
      </div>
    `;
  }
  if (state.adminTab === "payments") return adminPaymentTable();
  if (state.adminTab === "commissions") return adminCommissionTable();
  if (state.adminTab === "categories") {
    return `<div class="panel"><h3>Kategori yönetimi</h3><div class="tag-row">${["Oyun grubu", "Sanat atölyesi", "Spor", "Müzik", "Dans", "Drama", "Müze/gezi", "Bilim/STEM", "Doğa", "Ebeveyn-çocuk", "Tatil kampı", "Düzenli kurs"].map((item) => `<span class="tag">${item}</span>`).join("")}</div></div>`;
  }
  return `<div class="panel"><h3>Destek ve şikayetler</h3><div class="empty-state">Satıcı, etkinlik ve rezervasyon şikayetleri bu kuyrukta izlenecek.</div></div>`;
}

function adminPaymentTable() {
  return `
    <div class="panel">
      <h3>Ödeme kayıtları</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Rezervasyon</th><th>Provider</th><th>Tutar</th><th>Durum</th><th>Aksiyon</th></tr></thead>
          <tbody>${state.bookings.map((booking) => `<tr><td>${booking.id}</td><td>${booking.paymentProvider}</td><td>${money(booking.totalAmount)}</td><td>${statusPill(booking.status)}</td><td><button class="ghost-action" data-refund="${booking.id}">İade başlat</button></td></tr>`).join("") || `<tr><td colspan="5">Ödeme kaydı yok.</td></tr>`}</tbody>
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

async function handleLogin(form) {
  const data = new FormData(form);
  const email = String(data.get("email")).trim().toLowerCase();
  const password = String(data.get("password"));

  if (!state.supabaseReady) {
    state.currentUser = { id: `demo-${Date.now()}`, email };
    state.authProfile = {
      id: state.currentUser.id,
      email,
      role: email === ADMIN_EMAIL ? "admin" : "parent",
      full_name: email,
    };
    notify("Demo modda giriş yapıldı. Supabase ayarları girilince gerçek oturum açılır.");
    setRoute(email === ADMIN_EMAIL ? "admin" : "auth");
    return;
  }

  const { data: authData, error } = await state.supabaseClient.auth.signInWithPassword({ email, password });
  if (error) {
    notify(error.message);
    return;
  }
  await setSupabaseUser(authData.user);
  notify("Giriş başarılı.");
  setRoute(isAdmin() ? "admin" : "auth");
}

async function handleSignup(form) {
  const data = new FormData(form);
  const email = String(data.get("email")).trim().toLowerCase();
  const password = String(data.get("password"));
  const fullName = String(data.get("fullName")).trim();
  const requestedRole = String(data.get("role"));
  const role = email === ADMIN_EMAIL ? "admin" : requestedRole;
  const vendorName = String(data.get("vendorName") || "").trim();

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
    setRoute(role === "vendor" ? "vendor" : "auth");
    return;
  }

  const { data: authData, error } = await state.supabaseClient.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName, role } },
  });
  if (error) {
    notify(error.message);
    return;
  }

  const user = authData.user;
  if (user) {
    await state.supabaseClient.from("profiles").upsert({
      id: user.id,
      email,
      full_name: fullName,
      role,
      status: role === "vendor" ? "pending" : "active",
    });

    if (role === "vendor") {
      const { data: vendor } = await state.supabaseClient
        .from("vendors")
        .insert({
          name: vendorName || fullName,
          slug: `${(vendorName || fullName).toLocaleLowerCase("tr-TR").replaceAll(" ", "-")}-${Date.now()}`,
          status: "pending",
          city: "İstanbul",
          district: "Belirlenecek",
          commission_rate: 0.12,
          plan_code: "FREE",
        })
        .select()
        .single();

      if (vendor) {
        await state.supabaseClient.from("vendor_users").insert({
          vendor_id: vendor.id,
          user_id: user.id,
          role: "owner",
        });
      }
    }
  }

  await setSupabaseUser(user);
  notify("Üyelik oluşturuldu. E-posta doğrulama açıksa gelen kutusunu kontrol edin.");
  setRoute(role === "vendor" ? "vendor" : "auth");
}

async function handleLogout() {
  if (state.supabaseReady) await state.supabaseClient.auth.signOut();
  state.currentUser = null;
  state.authProfile = null;
  notify("Çıkış yapıldı.");
  setRoute("home");
}

async function handleChildCreate(form) {
  const data = new FormData(form);
  const child = {
    id: `child-${Date.now()}`,
    name: String(data.get("name")).trim(),
    age: Number(data.get("age")),
    interests: String(data.get("interests") || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
  };
  state.children.push(child);

  if (state.supabaseReady && state.currentUser) {
    await state.supabaseClient.from("children").insert({
      user_id: state.currentUser.id,
      name: child.name,
      age: child.age,
      interests: child.interests,
    });
  }

  notify("Çocuk profili eklendi.");
  renderAuth();
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("button, a");
  if (!target) return;

  if (target.dataset.route) setRoute(target.dataset.route);
  if (target.dataset.scroll) document.querySelector(`#${target.dataset.scroll}`)?.scrollIntoView({ behavior: "smooth" });
  if (target.dataset.detail) setRoute("detail", target.dataset.detail);
  if (target.dataset.favorite) {
    const id = target.dataset.favorite;
    state.favorites.has(id) ? state.favorites.delete(id) : state.favorites.add(id);
    notify(state.favorites.has(id) ? "Favorilere eklendi." : "Favorilerden çıkarıldı.");
    render();
  }
  if (target.dataset.vendorTab) {
    state.vendorTab = target.dataset.vendorTab;
    renderVendor();
  }
  if (target.dataset.adminTab) {
    state.adminTab = target.dataset.adminTab;
    renderAdmin();
  }
  if (target.dataset.approveVendor) {
    state.vendors.find((vendor) => vendor.id === target.dataset.approveVendor).status = "approved";
    notify("Firma onaylandı ve public yayına hazır.");
    renderAdmin();
  }
  if (target.dataset.approveActivity) {
    state.activities.find((activity) => activity.id === target.dataset.approveActivity).status = "approved";
    notify("Etkinlik onaylandı ve public listelerde görünecek.");
    renderAdmin();
  }
  if (target.dataset.refund) {
    const booking = state.bookings.find((item) => item.id === target.dataset.refund);
    if (booking) booking.status = "refunded";
    notify("İade süreci başlatıldı; komisyon ters kaydı simüle edildi.");
    renderAdmin();
  }
  if (target.dataset.notify) notify(target.dataset.notify);
  if (target.hasAttribute("data-logout")) handleLogout();
});

document.addEventListener("submit", (event) => {
  event.preventDefault();
  if (event.target.id === "bookingForm") createBooking(event.target);
  if (event.target.id === "activityForm") createActivity(event.target);
  if (event.target.id === "loginForm") handleLogin(event.target);
  if (event.target.id === "signupForm") handleSignup(event.target);
  if (event.target.id === "childForm") handleChildCreate(event.target);
});

document.querySelector("#mobileMenu").addEventListener("click", () => {
  document.querySelector(".primary-nav").classList.toggle("open");
});

initSupabase().finally(render);
