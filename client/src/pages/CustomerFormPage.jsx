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
            {...register("customerid", {
              required: true,
              maxLength: {
                value: 5,
                message: "Customer ID must be 5 characters long",
              },
              pattern: {
                value: /^[A-Za-z0-9]+$/,
                message:
                  "Customer ID must contain only alphanumeric characters",
              },
            })}
            className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
          />
          {errors.customerid && <span>{errors.customerid.message}</span>}
          <input
            type="text"
            placeholder={intl.formatMessage({
              id: "companyname",
              defaultMessage: "Company Name",
            })}
            {...register("companyname", {
              required: { value: true, message: "Company Name is required" },
              maxLength: {
                value: 40,
                message: "Company Name must be 40 characters long or less",
              },
            })}
            className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
          />
          {errors.companyname && <span>{errors.companyname.message}</span>}
          <input
            type="text"
            placeholder={intl.formatMessage({
              id: "contactname",
              defaultMessage: "Contact Name",
            })}
            {...register("contactname", {
              maxLength: {
                value: 30,
                message: "Contact Name must be 30 characters long or less",
              },
            })}
            className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
          />
          {errors.contactname && <span>{errors.contactname.message}</span>}
          <input
            type="text"
            placeholder={intl.formatMessage({
              id: "contacttitle",
              defaultMessage: "Contact Title",
            })}
            {...register("contacttitle", {
              maxLength: {
                value: 30,
                message: "Contact Title must be 30 characters long or less",
              },
            })}
            className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
          />
          {errors.contacttitle && <span>{errors.contacttitle.message}</span>}
          <input
            type="text"
            placeholder={intl.formatMessage({
              id: "address",
              defaultMessage: "Address",
            })}
            {...register("address", {
              maxLength: {
                value: 60,
                message: "Address must be 60 characters long or less",
              },
            })}
            className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
          />
          {errors.address && <span>{errors.address.message}</span>}
          <input
            type="text"
            placeholder={intl.formatMessage({
              id: "city",
              defaultMessage: "City",
            })}
            {...register("city", {
              maxLength: {
                value: 15,
                message: "City must be 15 characters long or less",
              },
            })}
            className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
          />
          {errors.city && <span>{errors.city.message}</span>}
          <input
            type="text"
            placeholder={intl.formatMessage({
              id: "region",
              defaultMessage: "Region",
            })}
            {...register("region", {
              maxLength: {
                value: 15,
                message: "Region must be 15 characters long or less",
              },
            })}
            className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
          />
          {errors.region && <span>{errors.region.message}</span>}
          <input
            type="text"
            placeholder={intl.formatMessage({
              id: "postalcode",
              defaultMessage: "Postal Code",
            })}
            {...register("postalcode", {
              maxLength: {
                value: 10,
                message: "Postal Code must be 10 characters long or less",
              },
            })}
            className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
          />
          {errors.postalcode && <span>{errors.postalcode.message}</span>}
          <input
            type="text"
            placeholder={intl.formatMessage({
              id: "country",
              defaultMessage: "Country",
            })}
            {...register("country", {
              maxLength: {
                value: 15,
                message: "Country must be 15 characters long or less",
              },
            })}
            className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
          />
          {errors.country && <span>{errors.country.message}</span>}
          <input
            type="text"
            placeholder={intl.formatMessage({
              id: "phone",
              defaultMessage: "Phone",
            })}
            {...register("phone", {
              maxLength: {
                value: 24,
                message: "Phone must be 24 characters long or less",
              },
            })}
            className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
          />
          {errors.phone && <span>{errors.phone.message}</span>}
          <input
            type="text"
            placeholder={intl.formatMessage({
              id: "fax",
              defaultMessage: "Fax",
            })}
            {...register("fax", {
              maxLength: {
                value: 24,
                message: "Fax must be 24 characters long or less",
              },
            })}
            className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
          />
          {errors.fax && <span>{errors.fax.message}</span>}
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
