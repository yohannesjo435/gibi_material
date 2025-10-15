export function formatPhone(phone: string) {
  phone = phone.trim();
  if (phone.startsWith("09") && phone.length === 10) {
    return "+251" + phone.slice(1);
  } else if (phone.startsWith("2519") && phone.length === 12) {
    return "+" + phone;
  } else if (phone.startsWith("+2519")) {
    return phone;
  }
  return null;
}

export const phoneToEmail = (normalizedPhone: string) => {
  return `${normalizedPhone.replace("+", "")}@phone-only.example.com`;
};
