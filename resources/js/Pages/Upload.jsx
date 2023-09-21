import App from "@/Layouts/App";
import { Head, useForm } from "@inertiajs/react";

export default function Upload() {
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

    console.log(data);
    return (
        <>
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
                    </div>
                </div>
            </div>
        </>
    );
}

Upload.layout = (page) => <App children={page} />;
