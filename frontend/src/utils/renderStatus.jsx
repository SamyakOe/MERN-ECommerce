import Processing from "../features/admin/components/status/Processing";
import Shipped from "../features/admin/components/status/Shipped";
import Delivered from "../features/admin/components/status/Delivered";
import Cancelled from "../features/admin/components/status/Cancelled";

export default function renderStatus(status) {
    switch (status) {
      case "Processing":
        return <Processing />;
      case "Shipped":
        return <Shipped />;
      case "Delivered":
        return <Delivered />;
      case "Cancelled":
        return <Cancelled />;
      default:
        return <span className="text-neutral-400">Unknown</span>;
    }
  };
