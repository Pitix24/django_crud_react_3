import { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { createCustomer, updateCustomer, getCustomer } from "../api/crud.api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useIntl, FormattedMessage } from "react-intl";
import Footer from "../components/Footer";

export function CustomerFormPage() {
  const intl = useIntl();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();
  const navigate = useNavigate();
  const params = useParams();
  const [editMode, setEditMode] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (editMode) {
        await updateCustomer(params.customerid, data);
        toast.success("Customer actualizado exitosamente", {
          position: "bottom-right",
          style: {
            background: "#101010",
            color: "#fff",
          },
        });
      } else {
        await createCustomer(data);
        toast.success("Customer creado exitosamente", {
          position: "bottom-right",
          style: {
            background: "#101010",
            color: "#fff",
          },
        });
      }
      navigate("/customers");
    } catch (error) {
      console.error("Error updating/creating customer: ", error);
    }
  });

  const loadCustomer = useCallback(async () => {
    if (params.customerid) {
      try {
        const { data } = await getCustomer(params.customerid);
        for (let field in data) {
          setValue(field, data[field]);
        }
        setEditMode(true);
      } catch (error) {
        console.error("Error loading customer: ", error);
      }
    } else {
      reset();
      setEditMode(false);
    }
  }, [params.customerid, setValue, reset]);

  useEffect(() => {
    loadCustomer();
  }, [loadCustomer]);

  return (
    <>
      <div className="max-w-xl mx-auto mt-12 mb-12">
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder={intl.formatMessage({
              id: "customerid",
              defaultMessage: "Customer ID",
            })}
            {...register("customerid", { required: true })}
            className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
          />
          {errors.customerid && (
            <span>
              <FormattedMessage
                id="fieldRequired"
                defaultMessage="This field is required"
              />
            </span>
          )}
          <input
            type="text"
            placeholder={intl.formatMessage({
              id: "companyname",
              defaultMessage: "Company Name",
            })}
            {...register("companyname", { required: true })}
            className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
          />
          {errors.companyname && (
            <span>
              <FormattedMessage
                id="fieldRequired"
                defaultMessage="This field is required"
              />
            </span>
          )}
          <input
            type="text"
            placeholder={intl.formatMessage({
              id: "contactname",
              defaultMessage: "Contact Name",
            })}
            {...register("contactname", { required: true })}
            className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
          />
          {errors.contactname && (
            <span>
              <FormattedMessage
                id="fieldRequired"
                defaultMessage="This field is required"
              />
            </span>
          )}
          <input
            type="text"
            placeholder={intl.formatMessage({
              id: "contacttitle",
              defaultMessage: "Contact Title",
            })}
            {...register("contacttitle", { required: true })}
            className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
          />
          {errors.contacttitle && (
            <span>
              <FormattedMessage
                id="fieldRequired"
                defaultMessage="This field is required"
              />
            </span>
          )}
          <input
            type="text"
            placeholder={intl.formatMessage({
              id: "address",
              defaultMessage: "Address",
            })}
            {...register("address", { required: true })}
            className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
          />
          {errors.address && (
            <span>
              <FormattedMessage
                id="fieldRequired"
                defaultMessage="This field is required"
              />
            </span>
          )}
          <input
            type="text"
            placeholder={intl.formatMessage({
              id: "city",
              defaultMessage: "City",
            })}
            {...register("city", { required: true })}
            className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
          />
          {errors.city && (
            <span>
              <FormattedMessage
                id="fieldRequired"
                defaultMessage="This field is required"
              />
            </span>
          )}
          <input
            type="text"
            placeholder={intl.formatMessage({
              id: "region",
              defaultMessage: "Region",
            })}
            {...register("region", { required: true })}
            className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
          />
          {errors.region && (
            <span>
              <FormattedMessage
                id="fieldRequired"
                defaultMessage="This field is required"
              />
            </span>
          )}
          <input
            type="text"
            placeholder={intl.formatMessage({
              id: "postalcode",
              defaultMessage: "Postal Code",
            })}
            {...register("postalcode", { required: true })}
            className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
          />
          {errors.postalcode && (
            <span>
              <FormattedMessage
                id="fieldRequired"
                defaultMessage="This field is required"
              />
            </span>
          )}
          <input
            type="text"
            placeholder={intl.formatMessage({
              id: "country",
              defaultMessage: "Country",
            })}
            {...register("country", { required: true })}
            className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
          />
          {errors.country && (
            <span>
              <FormattedMessage
                id="fieldRequired"
                defaultMessage="This field is required"
              />
            </span>
          )}
          <input
            type="text"
            placeholder={intl.formatMessage({
              id: "phone",
              defaultMessage: "Phone",
            })}
            {...register("phone", { required: true })}
            className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
          />
          {errors.phone && (
            <span>
              <FormattedMessage
                id="fieldRequired"
                defaultMessage="This field is required"
              />
            </span>
          )}
          <input
            type="text"
            placeholder={intl.formatMessage({
              id: "fax",
              defaultMessage: "Fax",
            })}
            {...register("fax", { required: true })}
            className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
          />
          {errors.fax && (
            <span>
              <FormattedMessage
                id="fieldRequired"
                defaultMessage="This field is required"
              />
            </span>
          )}
          <button className="bg-indigo-500 p-3 rounded-lg block w-full mt-3">
            <FormattedMessage id="save" defaultMessage="Save" />
          </button>
        </form>
      </div>
      <br></br>
      <Footer />
    </>
  );
}
