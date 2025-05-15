import { useParams } from "react-router-dom";
import { AddListing as UpdateListingForm } from "../components";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setListing,
  selectListings,
} from "../app/store/slices/vendorServiceSlice";
import { useGetListingByIdQuery } from "../app/services/vendorServices";

export const EditList = () => {
  const { listingId } = useParams();
  const { listing } = useSelector(selectListings);
  const dispatch = useDispatch();
  const { data, isSuccess } = useGetListingByIdQuery(listingId);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setListing(data));
    }
  }, [data, isSuccess, dispatch]);

  return (
    <>
      <UpdateListingForm />
    </>
  );
};
