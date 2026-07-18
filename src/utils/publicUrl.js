const publicUrl = (path) => {
  const p = path.replace(/^\/+/, "");
  const base = import.meta.env.BASE_URL ?? "/";
  return base.endsWith("/") ? `${base}${p}` : `${base}/${p}`;
};

export default publicUrl;
