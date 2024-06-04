import { useMemo } from "react";
import { Fragment } from "react";
import { Check, UserPlus, X } from "react-feather";
import { Row } from "reactstrap";
import { reverse } from "lodash";
import {
  SEND_REQUEST_ACCEPT_FRIEND_API,
  SEND_REQUEST_FOLLOWINGS_API,
  SEND_REQUEST_UNFOLLOWINGS_API,
  SEND_REQUEST_UNFRIEND_API,
} from "../../../constants/api";
import ConnectList from "../../../components/connect-list/ConnectList";
import BoardConnect from "../../../components/board-connect/BoardConnect";

const AccountConnect = (props) => {
  const { account, accountSuggestions, followCallback } = props;

  const renderFollowers = useMemo(() => {
    if (account.followers?.length > 0) {
      return (
        <ConnectList data={reverse(account.followers)} followCallback={followCallback} url={SEND_REQUEST_ACCEPT_FRIEND_API}>
          <Check size={14} />
        </ConnectList>
      );
    } else {
      return <div className="d-flex justify-content-center mt-1">Không có dữ liệu !</div>;
    }
  }, [account, followCallback]);

  const renderFollowings = useMemo(() => {
    if (account.followings?.length > 0) {
      return (
        <ConnectList data={reverse(account.followings)} followCallback={followCallback} url={SEND_REQUEST_UNFOLLOWINGS_API}>
          <X size={14} />
        </ConnectList>
      );
    } else {
      return <div className="d-flex justify-content-center mt-1">Không có dữ liệu !</div>;
    }
  }, [account, followCallback]);

  const renderFriends = useMemo(() => {
    if (reverse(account.friends)?.length > 0) {
      return (
        <ConnectList data={account.friends} followCallback={followCallback} url={SEND_REQUEST_UNFRIEND_API}>
          <X size={14} />
        </ConnectList>
      );
    } else {
      return <div className="d-flex justify-content-center mt-1">Không có dữ liệu !</div>;
    }
  }, [account, followCallback]);

  const renderSuggestions = useMemo(() => {
    if (accountSuggestions.length > 0) {
      return (
        <ConnectList data={reverse(accountSuggestions)} followCallback={followCallback} url={SEND_REQUEST_FOLLOWINGS_API}>
          <UserPlus size={14} />
        </ConnectList>
      );
    } else {
      return <div className="d-flex justify-content-center mt-1">Không có dữ liệu !</div>;
    }
  }, [accountSuggestions, followCallback]);
  return (
    <Fragment>
      <Row>
        <BoardConnect title="Bạn bè" component={renderFriends} />
        <BoardConnect title="Đang theo dõi" component={renderFollowings} />
        <BoardConnect title="Lời mời kết bạn" component={renderFollowers} />
        <BoardConnect title="Gợi ý" component={renderSuggestions} />
      </Row>
    </Fragment>
  );
};
export default AccountConnect;
