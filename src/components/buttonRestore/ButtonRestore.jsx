import { Fragment, useCallback } from "react";
import { RefreshCw } from "react-feather";
import { useTranslation } from "react-i18next";
import { UncontrolledTooltip } from "reactstrap";
import { TRASHS_RESTORE_API } from "../../constants/api";
import { useHttp } from "../../hook/useHttp";
import { getResponseFromServerWithParameters, toggleSweetAlert, toggleSweetConfirm } from "../../utils/helpers";
import { createParametersRequest } from "../../utils/sessionStorageHelper";

const ButtonRestore = (props) => {
  const { row, category } = props;
  const { t } = useTranslation();
  const http = useHttp();
  const onRestore = useCallback(
    async (row) => {
      const parameters = {
        trashId: row._id,
      };
      try {
        const response = await getResponseFromServerWithParameters(http, TRASHS_RESTORE_API, createParametersRequest(parameters));
        await toggleSweetAlert("Thông báo", response.message, response.data ? "info" : "error");
        if (response.data) {
          window.location.reload();
        }
      } catch (err) {
        toggleSweetAlert("Thông báo", err, "error");
      }
    },
    [http],
  );
  return (
    <Fragment>
      <RefreshCw
        size={16}
        className="cursor-pointer"
        onClick={() =>
          toggleSweetConfirm(
            `Bạn có muốn khôi phục ${t(`category_delete_mapping.${category}`, { defaultValue: "" })} này`,
            "Đồng ý",
            () => onRestore(row),
            false,
          )
        }
        id="restore"
      />
      <UncontrolledTooltip placement="top" target="restore">
        Khôi phục
      </UncontrolledTooltip>
    </Fragment>
  );
};
export default ButtonRestore;
