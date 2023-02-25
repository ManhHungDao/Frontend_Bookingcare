import { useEffect } from "react";
import adminService from "../services/adminService";

function PageViewCount({ pageId }) {
  useEffect(() => {
    adminService.pageViewCount();
  }, [pageId]);
}
export default PageViewCount;
