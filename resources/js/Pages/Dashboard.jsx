import Modal from "@/Components/Modal";
import NotifUpload from "@/Components/NotifUpload";
import App from "@/Layouts/App";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import { debounce, pickBy } from "lodash";
import { useCallback, useEffect, useState } from "react";

export default function Dashboard(props) {
    const { data: uploads, links, from } = props.uploads;
    const { filtered } = props;
    const { data, setData, post, reset } = useForm();
    const [pageNumber, setPageNumber] = useState([]);

    const [params, setParams] = useState(filtered);
    const onChange = (e) => {
        setParams({ ...params, [e.target.name]: e.target.value });
    };

    const reload = useCallback(
        debounce((query) => {
            router.get(route("dashboard"), pickBy(query), {
                preserveState: true,
                preserveScroll: true,
            });
        }, 300),

        []
    );

    useEffect(() => reload(params), [params]);

    const onChangeFile = (e) => {
        setData(e.target.name, e.target.files);
    };
    const onChangeData = (e) => {
        setData(e.target.name, e.target.files[0]);
    };
    const handlerSubmit = (e) => {
        e.preventDefault();
        post(route("upload.store"));
    };

    const handlerDataSubmit = (e) => {
        e.preventDefault();
        post(route("request.store"));
    };
    let numbers = [];
    useEffect(() => {
        for (let i = 10; i < 1000 / 10; i = i + 10) {
            numbers.push(i);
        }
        setPageNumber(numbers);
    }, []);
    return (
        <>
            <NotifUpload />
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex justify-between items-center p-6">
                            <a
                                href={`dashboard/export?q=${params.q}`}
                                className="flex items-center px-2.5 rounded-lg py-2 bg-orange-500 text-white gap-x-2 hover:bg-orange-400"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-4 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                                    />
                                </svg>
                                Download
                            </a>
                            <div className="flex w-full md:w-64 bg-white items-center border rounded-lg overflow-hidden focus-within:ring focus-within:border-blue-400 focus-within:ring-blue-100 transition duration-200">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-5 h-5 mx-2 text-gray-500 bg-white"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <input
                                    type="text"
                                    className="w-full h-10 p-0 focus:outline-none focus:ring-transparent focus:border-transparent border-none"
                                    placeholder="Search..."
                                    name="q"
                                    id="q"
                                    value={params.q}
                                    onChange={onChange}
                                />
                            </div>
                        </div>
                        <div className="p-6 text-gray-900">
                            Upload Your File
                        </div>
                        <div className="p-6">
                            <h1 className="font-bold mb-3">Upload PDF File</h1>
                            <form onSubmit={handlerSubmit}>
                                <input
                                    className="w-1/2 border p-2 rounded-lg mr-5"
                                    type="file"
                                    name="uploadFile"
                                    multiple
                                    onChange={onChangeFile}
                                />
                                <button
                                    type="submit"
                                    className="p-2 bg-gray-300 rounded-lg"
                                >
                                    Save
                                </button>
                            </form>
                        </div>
                        <div className="p-6">
                            <h1 className="font-bold mb-3">
                                Upload Data Request
                            </h1>
                            <form onSubmit={handlerDataSubmit}>
                                <input
                                    className="w-1/2 border p-2 rounded-lg mr-5"
                                    type="file"
                                    name="uploadData"
                                    multiple
                                    onChange={onChangeData}
                                />
                                <button
                                    type="submit"
                                    className="p-2 bg-gray-300 rounded-lg"
                                >
                                    Save
                                </button>
                            </form>
                        </div>

                        <div className="relative overflow-x-auto">
                            <table className="w-full text-sm  text-gray-900 dark:text-gray-400  text-center">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Code
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            account
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            regional
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            origin
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            seller Name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Links
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Created At
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {uploads.map((data, index) => (
                                        <tr
                                            key={index}
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                        >
                                            <td className="px-6 py-4">
                                                {data.package_id}
                                            </td>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                {data.account}
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                {data.regional}
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                {data.origin}
                                            </th>
                                            <td className="px-6 py-4">
                                                {data.seller_name}
                                            </td>
                                            <td className="px-6 py-4 font-bold text-gray-900 underline hover:text-orange-400">
                                                {data.upload && (
                                                    <a
                                                        href={`http://sunday.test/${data.upload.file_name}`}
                                                    >
                                                        {data.upload.file_name}
                                                    </a>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                {data.created_at}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <div className="flex gap-x-4 items-center">
                            <select
                                className="px-2.5 py-2 rounded-lg border-gray-300 w-16"
                                onChange={onChange}
                                name="load"
                                id="load"
                                value={params.load}
                            >
                                {pageNumber.map((page, index) => (
                                    <option value={page} key={index}>
                                        {page}
                                    </option>
                                ))}
                            </select>
                            <span className="text-gray-500 text-sm">
                                Loads Per Page
                            </span>
                        </div>
                        <ul className="flex gap-x-2">
                            {links.map((item, index) => (
                                <Link
                                    preserveScroll
                                    className={`${
                                        item.active
                                            ? "bg-white text-orange-500"
                                            : ""
                                    } px-2.5 py-2`}
                                    key={index}
                                    href={item.url}
                                    dangerouslySetInnerHTML={{
                                        __html: item.label,
                                    }}
                                />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = (page) => <App children={page} />;
