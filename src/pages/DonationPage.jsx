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
        // First, load all centers immediately so page doesn't hang
        fetchAllCenters();

        if (navigator.geolocation) {
            // Then try to get user location with a timeout
            const locationTimeout = setTimeout(() => {
                console.log("Location request timed out");
            }, 5000); // 5 second timeout

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    clearTimeout(locationTimeout);
                    setUserLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                },
                (error) => {
                    clearTimeout(locationTimeout);
                    console.error("Error getting location:", error);
                    // Don't show error toast, just silently continue with all centers
                },
                {
                    timeout: 5000, // 5 second timeout
                    enableHighAccuracy: false // Faster but less accurate
                }
            );
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
            <div className="min-h-screen bg-surface-bg pb-28 p-4 flex items-center justify-center">
                <p className="text-mobile-body font-inter text-utility-text">Loading donation centers...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-surface-bg pb-28 p-4">
            {/* Header */}
            <div className="mb-6">
                <h1 className="font-poppins font-medium text-mobile-h1 mb-2 text-slate-500">Donation</h1>
                <p className="text-mobile-body-sm md:text-desktop-body-sm font-inter text-utility-text">
                    Find nearby places to donate your excess food
                </p>
            </div>

            {/* Filters */}
            <div className="mb-4">
                <div className="flex gap-2 mb-4 overflow-x-auto">
                    <button
                        onClick={() => handleTypeFilter('all')}
                        className={`px-4 py-2 rounded-wasteless-sm whitespace-nowrap transition-all font-poppins font-medium text-mobile-caption ${
                            filterType === 'all'
                                ? 'bg-brand-500 text-white shadow-sm'
                                : 'bg-surface-accent text-utility-text hover:bg-utility-border'
                        }`}
                    >
                        All Centers
                    </button>
                    <button
                        onClick={() => handleTypeFilter('Food Bank')}
                        className={`px-4 py-2 rounded-wasteless-sm whitespace-nowrap transition-all font-poppins font-medium text-mobile-caption ${
                            filterType === 'Food Bank'
                                ? 'bg-brand-500 text-white shadow-sm'
                                : 'bg-surface-accent text-utility-text hover:bg-utility-border'
                        }`}
                    >
                        Food Banks
                    </button>
                    <button
                        onClick={() => handleTypeFilter('Shelter')}
                        className={`px-4 py-2 rounded-wasteless-sm whitespace-nowrap transition-all font-poppins font-medium text-mobile-caption ${
                            filterType === 'Shelter'
                                ? 'bg-brand-500 text-white shadow-sm'
                                : 'bg-surface-accent text-utility-text hover:bg-utility-border'
                        }`}
                    >
                        Shelters
                    </button>
                    <button
                        onClick={() => handleTypeFilter('Community Fridge')}
                        className={`px-4 py-2 rounded-wasteless-sm whitespace-nowrap transition-all font-poppins font-medium text-mobile-caption ${
                            filterType === 'Community Fridge'
                                ? 'bg-brand-500 text-white shadow-sm'
                                : 'bg-surface-accent text-utility-text hover:bg-utility-border'
                        }`}
                    >
                        Community Fridges
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    <label className="text-mobile-caption font-inter text-utility-text">Radius:</label>
                    <select
                        value={searchRadius}
                        onChange={(e) => setSearchRadius(Number(e.target.value))}
                        className="px-3 py-2 border border-utility-border rounded-wasteless-sm text-mobile-caption font-inter focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 bg-surface-bg text-slate-500"
                    >
                        <option value={5}>5 km</option>
                        <option value={10}>10 km</option>
                        <option value={20}>20 km</option>
                        <option value={50}>50 km</option>
                    </select>
                </div>
            </div>

            {/* Centers List */}
            <div>
                {centers.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">📍</div>
                        <h3 className="text-mobile-h2 font-poppins font-medium text-slate-500 mb-2">No Centers Found</h3>
                        <p className="text-mobile-body-sm font-inter text-utility-text">
                            Try increasing the search radius or changing filters
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <p className="text-mobile-caption font-inter text-utility-text mb-3">
                            Found {centers.length} donation center{centers.length !== 1 ? 's' : ''}
                        </p>

                        {centers.map((center) => (
                            <div
                                key={center.id}
                                className="bg-white border border-utility-border rounded-wasteless p-4 shadow-wasteless hover:shadow-wasteless-md transition-all"
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex-1">
                                        <h3 className="font-poppins font-medium text-mobile-h3 text-slate-500">
                                            {center.name}
                                        </h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="inline-block px-2 py-1 bg-brand-100 text-brand-700 text-mobile-caption rounded-wasteless-sm font-inter">
                                                {center.type}
                                            </span>
                                            {center.distanceKm && (
                                                <span className="text-mobile-caption font-inter text-utility-text">
                                                    {center.distanceKm.toFixed(1)} km away
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    {center.isCurrentlyOpen !== null && (
                                        <span
                                            className={`px-2 py-1 text-mobile-caption font-inter font-medium rounded-wasteless-sm ${
                                                center.isCurrentlyOpen
                                                    ? 'bg-brand-100 text-brand-700'
                                                    : 'bg-danger-100 text-danger-700'
                                            }`}
                                        >
                                            {center.isCurrentlyOpen ? 'Open' : 'Closed'}
                                        </span>
                                    )}
                                </div>

                                <div className="space-y-2 mb-3">
                                    <div className="flex items-start gap-2">
                                        <span className="text-utility-text">📍</span>
                                        <span className="text-mobile-body-sm font-inter text-slate-500">{center.address}, {center.city}, {center.state}</span>
                                    </div>

                                    {center.phoneNumber && (
                                        <div className="flex items-center gap-2">
                                            <span className="text-utility-text">📞</span>
                                            <a
                                                href={`tel:${center.phoneNumber}`}
                                                className="text-brand-600 hover:underline text-mobile-body-sm font-inter"
                                            >
                                                {center.phoneNumber}
                                            </a>
                                        </div>
                                    )}

                                    {center.openingHours && (
                                        <div className="flex items-start gap-2">
                                            <span className="text-utility-text">🕒</span>
                                            <span className="text-mobile-body-sm font-inter text-slate-500">{center.openingHours}</span>
                                        </div>
                                    )}

                                    {center.acceptedItems && (
                                        <div className="flex items-start gap-2">
                                            <span className="text-utility-text">✓</span>
                                            <span className="text-mobile-caption font-inter text-utility-text">Accepts: {center.acceptedItems}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => openInMaps(center)}
                                        className="flex-1 bg-brand-600 text-white py-2 px-4 rounded-wasteless text-mobile-button font-poppins font-medium hover:bg-brand-700 transition-colors shadow-sm"
                                    >
                                        Get Directions
                                    </button>
                                    {center.website && (
                                        <a
                                            href={center.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-4 py-2 border border-brand-600 text-brand-600 rounded-wasteless text-mobile-button font-poppins font-medium hover:bg-brand-50 transition-colors"
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
