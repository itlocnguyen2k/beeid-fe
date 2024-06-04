import { Fragment, useCallback } from "react";
import { Trash } from "react-feather";
import { useTranslation } from "react-i18next";
import { UncontrolledTooltip } from "reactstrap";
import { useHttp } from "../../hook/useHttp";
import { getResponseFromServerWithParameters, toggleSweetAlert, toggleSweetConfirm } from "../../utils/helpers";
import { createParametersRequest } from "../../utils/sessionStorageHelper";

const ButtonDelete = (props) => {
  const { row, category } = props;
  const { t } = useTranslation();
  const http = useHttp();
  const onDelete = useCallback(
    async (row) => {
      const parameters = {
        id: row._id,
      };
      try {
        const response = await getResponseFromServerWithParameters(
          http,
          `${t(`category_delete_url_mapping.${category}`, { defaultValue: "" })}`,
          createParametersRequest(parameters),
        );
        await toggleSweetAlert("Thông báo", response.message, response.data ? "info" : "error");
        if (response.data) {
          window.location.reload();
        }
      } catch (err) {
        toggleSweetAlert("Thông báo", err, "error");
      }
    },
    [http, t, category],
  );
  return (
    <Fragment>
      <Trash
        size={16}
        className="cursor-pointer"
        onClick={() =>
          toggleSweetConfirm(
            `Bạn có muốn xóa ${t(`category_delete_mapping.${category}`, { defaultValue: "" })} này`,
            "Đồng ý",
            () => onDelete(row),
            false,
          )
        }
        id="delete"
      />
      <UncontrolledTooltip placement="top" target="delete">
        Xóa
      </UncontrolledTooltip>
    </Fragment>
  );
};
export default ButtonDelete;
