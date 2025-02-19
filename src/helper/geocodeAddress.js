import axios from "axios";
import { toast } from "react-toastify";

async function geocodeAddress(address) {
  try {
    const { data } = await axios.get(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        address
      )}`
    );
    if (data.length === 0) {
      return null;
    }

    const { lat, lon } = data[0];
    return [lat, lon];
  } catch (error) {
    toast.error(error.message);
  }
}

export default geocodeAddress;
