import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import BottomNav from "../components/BottomNav";
import { donationService } from "../services";

export default function DonationPage() {
    const [centers, setCenters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userLocation, setUserLocation] = useState(null);
    const [filterType, setFilterType] = useState('all');
    const [searchRadius, setSearchRadius] = useState(10);

    const fetchAllCenters = async () => {
        setLoading(true);
        try {
            const data = await donationService.getAllCenters();
            setCenters(data);
        } catch (error) {
            console.error("Failed to fetch donation centers:", error);
            toast.error("Failed to load donation centers");
        } finally {
            setLoading(false);
        }
    };

    const getUserLocation = useCallback(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                },
                (error) => {
                    console.error("Error getting location:", error);
                    toast.error("Unable to get your location. Showing all centers.");
                    fetchAllCenters();
                }
            );
        } else {
            toast.error("Geolocation is not supported by your browser");
            fetchAllCenters();
        }
    }, []);

    useEffect(() => {
        getUserLocation();
    }, [getUserLocation]);

    const fetchDonationCenters = useCallback(async () => {
        setLoading(true);
        try {
            const params = {
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
                radius: searchRadius
            };

            if (filterType !== 'all') {
                params.type = filterType;
            }

            const data = await donationService.findNearbyCenters(params);
            setCenters(data);
        } catch (error) {
            console.error("Failed to fetch donation centers:", error);
            toast.error("Failed to load donation centers");
        } finally {
            setLoading(false);
        }
    }, [userLocation, searchRadius, filterType]);

    useEffect(() => {
        if (userLocation) {
            fetchDonationCenters();
        }
    }, [userLocation, searchRadius, filterType, fetchDonationCenters]);

    const handleTypeFilter = (type) => {
        setFilterType(type);
    };

    const openInMaps = (center) => {
        const url = `https://www.google.com/maps/search/?api=1&query=${center.latitude},${center.longitude}`;
        window.open(url, '_blank');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white pb-28 p-4 flex items-center justify-center">
                <p className="text-gray-500">Loading donation centers...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white pb-28">
            {/* Header */}
            <div className="bg-green-600 text-white p-4 pb-6">
                <h1 className="font-semibold text-xl mb-2">Food Donation Centers</h1>
                <p className="text-sm opacity-90">
                    Find nearby places to donate your excess food
                </p>
            </div>

            {/* Filters */}
            <div className="p-4 bg-gray-50 border-b">
                <div className="flex gap-2 mb-3 overflow-x-auto">
                    <button
                        onClick={() => handleTypeFilter('all')}
                        className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                            filterType === 'all'
                                ? 'bg-green-600 text-white'
                                : 'bg-white text-gray-700 border border-gray-300 hover:border-green-600'
                        }`}
                    >
                        All Centers
                    </button>
                    <button
                        onClick={() => handleTypeFilter('Food Bank')}
                        className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                            filterType === 'Food Bank'
                                ? 'bg-green-600 text-white'
                                : 'bg-white text-gray-700 border border-gray-300 hover:border-green-600'
                        }`}
                    >
                        Food Banks
                    </button>
                    <button
                        onClick={() => handleTypeFilter('Shelter')}
                        className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                            filterType === 'Shelter'
                                ? 'bg-green-600 text-white'
                                : 'bg-white text-gray-700 border border-gray-300 hover:border-green-600'
                        }`}
                    >
                        Shelters
                    </button>
                    <button
                        onClick={() => handleTypeFilter('Community Fridge')}
                        className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                            filterType === 'Community Fridge'
                                ? 'bg-green-600 text-white'
                                : 'bg-white text-gray-700 border border-gray-300 hover:border-green-600'
                        }`}
                    >
                        Community Fridges
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600">Radius:</label>
                    <select
                        value={searchRadius}
                        onChange={(e) => setSearchRadius(Number(e.target.value))}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        <option value={5}>5 km</option>
                        <option value={10}>10 km</option>
                        <option value={20}>20 km</option>
                        <option value={50}>50 km</option>
                    </select>
                </div>
            </div>

            {/* Centers List */}
            <div className="p-4">
                {centers.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">📍</div>
                        <h3 className="font-semibold text-lg mb-2">No Centers Found</h3>
                        <p className="text-gray-500 text-sm">
                            Try increasing the search radius or changing filters
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <p className="text-sm text-gray-600 mb-3">
                            Found {centers.length} donation center{centers.length !== 1 ? 's' : ''}
                        </p>

                        {centers.map((center) => (
                            <div
                                key={center.id}
                                className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-lg text-gray-900">
                                            {center.name}
                                        </h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                                                {center.type}
                                            </span>
                                            {center.distanceKm && (
                                                <span className="text-xs text-gray-500">
                                                    {center.distanceKm.toFixed(1)} km away
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    {center.isCurrentlyOpen !== null && (
                                        <span
                                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                                                center.isCurrentlyOpen
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-red-100 text-red-700'
                                            }`}
                                        >
                                            {center.isCurrentlyOpen ? 'Open' : 'Closed'}
                                        </span>
                                    )}
                                </div>

                                <div className="space-y-2 text-sm text-gray-600 mb-3">
                                    <div className="flex items-start gap-2">
                                        <span className="text-gray-400">📍</span>
                                        <span>{center.address}, {center.city}, {center.state}</span>
                                    </div>

                                    {center.phoneNumber && (
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-400">📞</span>
                                            <a
                                                href={`tel:${center.phoneNumber}`}
                                                className="text-green-600 hover:underline"
                                            >
                                                {center.phoneNumber}
                                            </a>
                                        </div>
                                    )}

                                    {center.openingHours && (
                                        <div className="flex items-start gap-2">
                                            <span className="text-gray-400">🕒</span>
                                            <span>{center.openingHours}</span>
                                        </div>
                                    )}

                                    {center.acceptedItems && (
                                        <div className="flex items-start gap-2">
                                            <span className="text-gray-400">✓</span>
                                            <span className="text-xs">Accepts: {center.acceptedItems}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => openInMaps(center)}
                                        className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                                    >
                                        Get Directions
                                    </button>
                                    {center.website && (
                                        <a
                                            href={center.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-4 py-2 border border-green-600 text-green-600 rounded-lg text-sm font-medium hover:bg-green-50 transition-colors"
                                        >
                                            Website
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <BottomNav />
        </div>
    );
}
