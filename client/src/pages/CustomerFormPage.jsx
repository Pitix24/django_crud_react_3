import React, { useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { createOrder, updateOrder, getOrder } from "../api/crud.api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useIntl, FormattedMessage } from "react-intl";

export function OrderFormPage() {
  const intl = useIntl();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const params = useParams();

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (params.orderid) {
        await updateOrder(params.orderid, data);
        toast.success("Order actualizada exitosamente", {
          position: "bottom-right",
          style: {
            background: "#101010",
            color: "#fff",
          },
        });
      } else {
        await createOrder(data);
        toast.success("Order creada exitosamente", {
          position: "bottom-right",
          style: {
            background: "#101010",
            color: "#fff",
          },
        });
      }
      navigate("/orders");
    } catch (error) {
      console.error("Error updating/creating order: ", error);
    }
  });

  const loadOrder = useCallback(async () => {
    if (params.orderid) {
      try {
        const { data } = await getOrder(params.orderid);
        for (let field in data) {
          setValue(field, data[field]);
        }
      } catch (error) {
        console.error("Error loading order: ", error);
      }
    }
  }, [params.orderid, setValue]);

  useEffect(() => {
    loadOrder();
  }, [loadOrder]);

  const handleBack = () => {
    navigate("/orders");
  };

  return (
    <div className="max-w-xl mx-auto mt-12">
      <div className="text-center bg-white py-6 mb-8 rounded-t-lg rounded-b-none">
        <h1 className="text-4xl font-semibold dark:text-black">Orden</h1>
      </div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder={intl.formatMessage({
            id: "orderid",
            defaultMessage: "Order ID",
          })}
          {...register("orderid", {
            required: true,
            pattern: /^[0-9]{1,11}$/, // Expresión regular para aceptar solo números y máximo 11 dígitos
          })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        />
        {errors.orderid && errors.orderid.type === "required" && (
          <span>this field is required</span>
        )}
        {errors.orderid && errors.orderid.type === "pattern" && (
          <span>Order ID must be a number and maximum of 11 digits</span>
        )}

        <input
          type="text"
          placeholder={intl.formatMessage({
            id: "customerid",
            defaultMessage: "Customer ID",
          })}
          {...register("customerid", { required: true })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        />
        {errors.customerid && <span>this field is required</span>}

        <input
          type="text"
          placeholder={intl.formatMessage({
            id: "employeeid",
            defaultMessage: "Employee ID",
          })}
          {...register("employeeid", { required: true })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        />
        {errors.employeeid && <span>this field is required</span>}

        <input
          type="text"
          placeholder={intl.formatMessage({
            id: "orderdate",
            defaultMessage: "Order Date",
          })}
          {...register("orderdate", { required: true })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        />
        {errors.orderdate && <span>this field is required</span>}
        <input
          type="text"
          placeholder={intl.formatMessage({
            id: "requireddate",
            defaultMessage: "Required Date",
          })}
          {...register("requireddate", { required: true })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        />
        {errors.requireddate && <span>this field is required</span>}
        <input
          type="text"
          placeholder={intl.formatMessage({
            id: "shippeddate",
            defaultMessage: "Shipped Date",
          })}
          {...register("shippeddate", { required: true })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        />
        {errors.shippeddate && <span>this field is required</span>}

        <input
          type="text"
          placeholder={intl.formatMessage({
            id: "shipvia",
            defaultMessage: "Ship Via",
          })}
          {...register("shipvia", {
            required: true,
            pattern: /^[0-9]{1,11}$/, // aceptar solo números y máximo de 11 dígitos
          })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        />
        {errors.shipvia && errors.shipvia.type === "required" && (
          <span>this field is required</span>
        )}
        {errors.shipvia && errors.shipvia.type === "pattern" && (
          <span>Ship Via must be a number and maximum of 11 digits</span>
        )}

        <input
          type="text"
          placeholder={intl.formatMessage({
            id: "freight",
            defaultMessage: "Freight",
          })}
          {...register("freight", { required: true })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        />
        {errors.freight && <span>this field is required</span>}

        <input
          type="text"
          placeholder={intl.formatMessage({
            id: "shipname",
            defaultMessage: "Ship Name",
          })}
          {...register("shipname", {
            required: true,
            pattern: /^[a-zA-Z0-9\s]{1,40}$/, // Expresión regular para aceptar letras, números y espacios, con un máximo de 40 caracteres
          })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        />
        {errors.shipname && errors.shipname.type === "required" && (
          <span>this field is required</span>
        )}
        {errors.shipname && errors.shipname.type === "pattern" && (
          <span>Ship Name must be a maximum of 40 characters</span>
        )}

        <input
          type="text"
          placeholder={intl.formatMessage({
            id: "shipaddress",
            defaultMessage: "Ship Address",
          })}
          {...register("shipaddress", {
            required: true,
            maxLength: 60, // Establece la longitud máxima permitida como 60 caracteres
          })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        />
        {errors.shipaddress && errors.shipaddress.type === "required" && (
          <span>this field is required</span>
        )}

        <input
          type="text"
          placeholder={intl.formatMessage({
            id: "shipcity",
            defaultMessage: "Ship City",
          })}
          {...register("shipcity", {
            required: true,
            maxLength: 15, // Establece la longitud máxima permitida como 15 caracteres
          })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        />
        {errors.shipcity && errors.shipcity.type === "required" && (
          <span>this field is required</span>
        )}

        <input
          type="text"
          placeholder={intl.formatMessage({
            id: "shipregion",
            defaultMessage: "Ship Region",
          })}
          {...register("shipregion", {
            required: true,
            maxLength: 15, // Establece la longitud máxima permitida como 15 caracteres
          })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        />
        {errors.shipregion && errors.shipregion.type === "required" && (
          <span>this field is required</span>
        )}

        <input
          type="text"
          placeholder={intl.formatMessage({
            id: "shippostalcode",
            defaultMessage: "Ship Postal Code",
          })}
          {...register("shippostalcode", {
            required: true,
            maxLength: 10,
          })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        />
        {errors.shippostalcode && errors.shippostalcode.type === "required" && (
          <span>this field is required</span>
        )}

        <input
          type="text"
          placeholder={intl.formatMessage({
            id: "shipcountry",
            defaultMessage: "Ship Country",
          })}
          {...register("shipcountry", {
            required: true,
            maxLength: 15,
          })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        />
        {errors.shipcountry && errors.shipcountry.type === "required" && (
          <span>this field is required</span>
        )}

        <div className="flex justify-center space-x-4 mt-6">
          <button
            className="bg-indigo-500 p-3 rounded-lg block w-32"
            type="submit"
          >
            <FormattedMessage id="save" defaultMessage="Save" />
          </button>
          <button
            className="bg-blue-500 p-3 rounded-lg block w-32"
            type="button"
            onClick={handleBack}
          >
            <FormattedMessage id="back" defaultMessage="Volver" />
          </button>
        </div>
      </form>
    </div>
  );
}
