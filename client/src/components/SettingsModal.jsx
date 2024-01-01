import React, { useState, useEffect } from 'react'
import SuccesfulToast from './SuccesfulToast';

const SettingsModal = () => {


    const [toastSuccess, setToastSuccess] = useState(null)


    const [formData, setFormData] = useState({
        company: '',
        address: '',
        zip: '',
        city: '',
        country: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Update the state only if the value is different from the default value
        setFormData((prevData) => ({
            ...prevData,
            [name]: value !== undefined ? value : prevData[name],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/settings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Settings saved successfully');
                setToastSuccess(<SuccesfulToast />)
            } else {
                console.error('Failed to save settings');
            }
        } catch (error) {
            console.error('Error saving settings:', error);
        }
    };

    const [settings, setSettings] = useState({
        company: '',
        address: '',
        zip: '',
        city: '',
        country: '',
    });

    useEffect(() => {
        // Fetch settings on component mount
        fetch("http://localhost:3000/settings")
            .then((response) => response.json())
            .then((data) => setSettings(data))
            .catch((error) => console.error("Error fetching settings:", error));
    }, []);
    useEffect(() => {
        setFormData(settings);
    }, [settings]);

    return (
        <>
            {toastSuccess}

            <dialog id="settings_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-5">Postavke</h3>
                    <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                        <div className="mb-5">
                            <label
                                htmlFor="company"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Naziv Vaše tvrtke
                            </label>
                            <input
                                type="text"
                                id="company"
                                name="company"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required={true}
                                onChange={handleInputChange}
                                value={formData.company}
                            />
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="address"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Adresa
                            </label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required={true}
                                onChange={handleInputChange}
                                value={formData.address}
                            />
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="zip"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Poštanski broj
                            </label>
                            <input
                                type="number"
                                id="zip"
                                name="zip"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required={true}
                                onChange={handleInputChange}
                                value={formData.zip}
                            />
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="city"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Grad
                            </label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required={true}
                                onChange={handleInputChange}
                                value={formData.city}
                            />
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="country"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Država
                            </label>
                            <input
                                type="text"
                                id="country"
                                name="country"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required={true}
                                onChange={handleInputChange}
                                value={formData.country}
                            />
                        </div>

                        <button
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Spremi
                        </button>
                    </form>

                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>

    )
}

export default SettingsModal