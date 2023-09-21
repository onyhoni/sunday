import Modal from "@/Components/Modal";
import NotifUpload from "@/Components/NotifUpload";
import App from "@/Layouts/App";
import AuthenticatedLayout from "@/Layouts/App";
import { Head, useForm, usePage } from "@inertiajs/react";

export default function Dashboard(props) {
    const { data: uploads, links, from } = props.uploads;
    const { data, setData, post, resrt } = useForm();
    const onChange = (e) => {
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
    return (
        <>
            <NotifUpload />
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
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
                                    onChange={onChange}
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
                            <table className="w-full text-sm  text-gray-500 dark:text-gray-400  text-center">
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
                </div>
            </div>
        </>
    );
}

Dashboard.layout = (page) => <App children={page} />;
