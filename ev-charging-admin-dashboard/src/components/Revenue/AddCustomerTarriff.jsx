// src/components/Revenue/AddCustomerTariff.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Authentication/AuthContext';
import {
  Settings,
  Plus,
  ChevronDown,
  User,
  Building,
  LogOut,
  Users,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Trash2,
  Loader2,
  Calendar,
  Clock,
  Mail,
  Phone,
  Menu,
  Filter,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  UserPlus,
  MoreVertical,
  Circle,
  CircleCheck,
  CircleX,
  CircleAlert,
  UserRound,
  BadgeCheck,
  Activity,
  Power,
  PowerOff,
  Save,
  ArrowRight,
  Info,
  Sparkles,
  Award,
  Star,
  Zap,
  Layers,
  Gift,
  Crown,
  Check,
  List,
  Grid,
  Search as SearchIcon,
  FileText,
  Tag,
  DollarSign,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  Percent,
  IndianRupee,
  Globe,
  MapPin,
  Wifi,
  Plug,
  Battery,
  Gauge,
  RadioTower,
  Link as LinkIcon,
  CreditCard,
  Wallet,
  Receipt,
  TrendingUp,
  TrendingDown,
  BarChart,
  PieChart,
  LineChart,
  Settings as SettingsIcon,
  Sliders,
  ToggleLeft,
  ToggleRight,
  CalendarDays,
  Timer,
  Infinity,
  Package,
  Repeat,
  Landmark,
  Banknote,
  File,
  Server,
  Database,
  Cloud,
  Smartphone,
  Monitor,
  Tablet,
  Laptop,
  Cpu,
  HardDrive,
  Network,
  Radio,
  Bluetooth,
  Thermometer,
  Wind,
  Droplet,
  Sun,
  Moon,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudWind,
  CloudFog,
  CloudDrizzle,
  CloudHail,
  CloudSleet,
  CloudThunder,
  CloudTornado,
  CloudHurricane,
  CloudTyphoon,
  CloudCyclone,
  CloudStorm,
  CloudRainbow,
  CloudSun,
  CloudMoon,
  CloudStar,
  CloudComet,
  CloudAsteroid,
  CloudMeteor,
  CloudGalaxy,
  CloudUniverse,
  CloudMultiverse,
  AlertCircle,
  Shield
} from 'lucide-react';
import Sidebar from '../Sidebar/Sidebar';

// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://dev-evcmsnew.transev.site';

const API_CONFIG = {
  USER_GROUPS_API: `${API_BASE_URL}/api/v1/cpo/user-groups`,
  USER_GROUP_TARIFFS_API: (groupId) => `${API_BASE_URL}/api/v1/cpo/user-groups/${groupId}/tariffs`,
  HUBS_API: `${API_BASE_URL}/api/v1/cpo/hubs`,
  CHARGERS_API: `${API_BASE_URL}/api/v1/cpo/chargers`,
  GST_API: `${API_BASE_URL}/api/v1/cpo/gst`,
  USER_INFO_API: `${API_BASE_URL}/api/v1/auth/me`
};

const AddCustomerTariff = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { authenticatedRequest, logout, isRefreshing, isAuthenticated, user } = useAuth();
  
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userGroups, setUserGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showGroupDropdown, setShowGroupDropdown] = useState(false);
  
  // Hubs, Chargers and GST states
  const [hubs, setHubs] = useState([]);
  const [chargers, setChargers] = useState([]);
  const [gstList, setGstList] = useState([]);
  const [loadingHubs, setLoadingHubs] = useState(false);
  const [loadingChargers, setLoadingChargers] = useState(false);
  const [loadingGST, setLoadingGST] = useState(false);
  const [filteredChargers, setFilteredChargers] = useState([]);
  
  // Form state - Matches backend CreateUserGroupTariff request
  const [formData, setFormData] = useState({
    hub_id: '',
    charger_id: '',
    gst_id: '',
    price_per_kwh: '',
    idle_fee_per_min: '0',
    currency: 'INR',
    is_active: true,
    start_date: '',
    end_date: ''
  });

  // Form validation errors
  const [formErrors, setFormErrors] = useState({});

  // Fetch user info and groups
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin');
      return;
    }
    fetchUserInfo();
    fetchUserGroups();
    fetchHubs();
    fetchChargers();
    fetchGSTList();
    
    const state = location.state;
    if (state && state.groupId) {
      // Wait for groups to load before setting selected group
      const checkGroup = () => {
        const group = userGroups.find(g => g.id === state.groupId);
        if (group) {
          setSelectedGroup(group);
        } else {
          setTimeout(checkGroup, 100);
        }
      };
      checkGroup();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, navigate, location]);

  const fetchUserInfo = async () => {
    try {
      const response = await authenticatedRequest(API_CONFIG.USER_INFO_API, {
        method: 'GET'
      });
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const fetchUserGroups = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await authenticatedRequest(API_CONFIG.USER_GROUPS_API, {
        method: 'GET'
      });

      if (response.ok) {
        const data = await response.json();
        const groups = data.user_groups || data.data || data || [];
        setUserGroups(groups);
      } else {
        setError('Failed to fetch customer groups');
      }
    } catch (error) {
      console.error('Error fetching user groups:', error);
      setError('An error occurred while fetching groups');
    } finally {
      setLoading(false);
    }
  }, [authenticatedRequest]);

  // Fetch hubs using GET /api/v1/cpo/hubs
  const fetchHubs = useCallback(async () => {
    setLoadingHubs(true);
    try {
      const response = await authenticatedRequest(API_CONFIG.HUBS_API, {
        method: 'GET'
      });

      if (response.ok) {
        const data = await response.json();
        const hubsData = data.hubs || data.data || data || [];
        setHubs(hubsData);
      } else {
        setHubs([]);
      }
    } catch (error) {
      console.error('Error fetching hubs:', error);
      setHubs([]);
    } finally {
      setLoadingHubs(false);
    }
  }, [authenticatedRequest]);

  // Fetch chargers using GET /api/v1/cpo/chargers
  const fetchChargers = useCallback(async () => {
    setLoadingChargers(true);
    try {
      const response = await authenticatedRequest(API_CONFIG.CHARGERS_API, {
        method: 'GET'
      });

      if (response.ok) {
        const data = await response.json();
        const chargersData = data.chargers || data.data || data || [];
        setChargers(chargersData);
      } else {
        setChargers([]);
      }
    } catch (error) {
      console.error('Error fetching chargers:', error);
      setChargers([]);
    } finally {
      setLoadingChargers(false);
    }
  }, [authenticatedRequest]);

  // Fetch GST list using GET /api/v1/cpo/gst
  const fetchGSTList = useCallback(async () => {
    setLoadingGST(true);
    try {
      const response = await authenticatedRequest(API_CONFIG.GST_API, {
        method: 'GET'
      });

      if (response.ok) {
        const data = await response.json();
        const gstData = data.gsts || data.data || data || [];
        setGstList(gstData);
      } else {
        setGstList([]);
      }
    } catch (error) {
      console.error('Error fetching GST list:', error);
      setGstList([]);
    } finally {
      setLoadingGST(false);
    }
  }, [authenticatedRequest]);

  // Filter chargers based on selected hub
  useEffect(() => {
    if (formData.hub_id) {
      const filtered = chargers.filter(c => c.hub_id === formData.hub_id);
      setFilteredChargers(filtered);
    } else {
      setFilteredChargers([]);
    }
  }, [formData.hub_id, chargers]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleGroupSelect = (group) => {
    setSelectedGroup(group);
    setShowGroupDropdown(false);
  };

  const handleHubChange = (e) => {
    const hubId = e.target.value;
    setFormData(prev => ({ 
      ...prev, 
      hub_id: hubId,
      charger_id: '' // Reset charger when hub changes
    }));
    if (formErrors.hub_id) {
      setFormErrors(prev => ({ ...prev, hub_id: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!selectedGroup) {
      errors.group = 'Please select a customer group';
    }
    if (!formData.hub_id) {
      errors.hub_id = 'Hub is required';
    }
    if (!formData.price_per_kwh) {
      errors.price_per_kwh = 'Price per kWh is required';
    } else if (isNaN(formData.price_per_kwh) || parseFloat(formData.price_per_kwh) < 0) {
      errors.price_per_kwh = 'Please enter a valid price';
    }
    if (formData.idle_fee_per_min && (isNaN(formData.idle_fee_per_min) || parseFloat(formData.idle_fee_per_min) < 0)) {
      errors.idle_fee_per_min = 'Please enter a valid idle fee';
    }
    // Validate date range if both are provided
    if (formData.start_date && formData.end_date) {
      const start = new Date(formData.start_date);
      const end = new Date(formData.end_date);
      if (start >= end) {
        errors.date_range = 'Start date must be before end date';
      }
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit to CreateUserGroupTariff API - matches backend exactly
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      // Build payload matching backend CreateUserGroupTariff request
      const payload = {
        hub_id: formData.hub_id,
        price_per_kwh: parseFloat(formData.price_per_kwh),
        idle_fee_per_min: parseFloat(formData.idle_fee_per_min) || 0,
        currency: formData.currency,
        is_active: formData.is_active
      };

      // Optional fields - only include if provided
      if (formData.charger_id) {
        payload.charger_id = formData.charger_id;
      }
      if (formData.gst_id) {
        payload.gst_id = formData.gst_id;
      }
      if (formData.start_date) {
        payload.start_date = formData.start_date;
      }
      if (formData.end_date) {
        payload.end_date = formData.end_date;
      }

      console.log('📤 Creating user group tariff payload:', payload);

      const response = await authenticatedRequest(
        API_CONFIG.USER_GROUP_TARIFFS_API(selectedGroup.id),
        {
          method: 'POST',
          body: JSON.stringify(payload)
        }
      );

      const data = await response.json();
      console.log('📥 Response:', data);

      if (response.ok) {
        setSuccess('Tariff created successfully!');
        // Reset form
        setFormData({
          hub_id: '',
          charger_id: '',
          gst_id: '',
          price_per_kwh: '',
          idle_fee_per_min: '0',
          currency: 'INR',
          is_active: true,
          start_date: '',
          end_date: ''
        });
        // Navigate back to tariffs list after delay
        setTimeout(() => {
          navigate('/revenue/customer-tariffs');
        }, 2000);
      } else {
        setError(data.message || data.error?.message || 'Failed to create tariff');
      }
    } catch (error) {
      console.error('Error creating tariff:', error);
      setError('An error occurred while creating the tariff');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
      navigate('/signin');
    }
  };

  const handleThemeToggle = () => setIsDarkMode(!isDarkMode);

  const getStatusColor = (isActive) => {
    return isActive 
      ? 'bg-green-100 text-green-700 border-green-200'
      : 'bg-red-100 text-red-700 border-red-200';
  };

  const getStatusIcon = (isActive) => {
    return isActive 
      ? <CheckCircle className="w-3 h-3" />
      : <XCircle className="w-3 h-3" />;
  };

  // Settings Dropdown Menu
  const SettingsMenu = () => (
    <div className="absolute top-full right-0 mt-2 bg-black rounded-2xl w-80 shadow-2xl border border-gray-800 z-50 overflow-hidden">
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-2xl font-bold text-white border-2 border-white/30 flex-shrink-0">
            {userData?.user?.full_name?.charAt(0) || user?.name?.charAt(0) || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-base font-semibold text-white truncate">
              {userData?.user?.full_name || user?.name || 'User'}
            </h4>
            <p className="text-sm text-gray-400 truncate">
              {userData?.user?.email || user?.email || 'user@transev.com'}
            </p>
            {userData?.role && (
              <span className="inline-block mt-1 px-2 py-0.5 bg-white/10 rounded-full text-xs text-gray-300 border border-gray-600">
                {userData.role}
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-2">
        <button onClick={() => { setShowSettingsMenu(false); navigate('/profile'); }} className="w-full text-left px-4 py-2.5 rounded-xl hover:bg-gray-800 text-sm font-medium text-gray-300 hover:text-white flex items-center gap-3 transition">
          <User size={16} className="text-gray-500" /> <span>Profile</span>
        </button>
        <button onClick={() => { setShowSettingsMenu(false); navigate('/organization'); }} className="w-full text-left px-4 py-2.5 rounded-xl hover:bg-gray-800 text-sm font-medium text-gray-300 hover:text-white flex items-center gap-3 transition">
          <Building size={16} className="text-gray-500" /> <span>Organization</span>
        </button>
        <div className="border-t border-gray-700 my-1"></div>
        <button onClick={() => { setShowSettingsMenu(false); handleLogout(); }} className="w-full text-left px-4 py-2.5 rounded-xl hover:bg-red-900/30 text-sm font-medium text-red-400 hover:text-red-300 flex items-center gap-3 transition">
          <LogOut size={16} className="text-red-500" /> <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  // Add Dropdown Menu
  const AddMenu = () => (
    <div className="absolute top-full right-0 mt-2 bg-black rounded-2xl w-64 shadow-2xl border border-gray-800 z-50">
      <div className="p-3">
        <button onClick={() => { setShowAddMenu(false); navigate("/add-hub"); }} className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-800 text-sm font-medium text-gray-300 hover:text-white flex items-center gap-3 transition">
          <Zap size={18} className="text-gray-400" /> Add Hub
        </button>
        <button onClick={() => { setShowAddMenu(false); navigate("/add-charger"); }} className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-800 text-sm font-medium text-gray-300 hover:text-white flex items-center gap-3 transition">
          <Zap size={18} className="text-gray-400" /> Add Charger
        </button>
      </div>
    </div>
  );

  if (isRefreshing) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600">Refreshing session...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        isDarkMode={isDarkMode} 
        onThemeToggle={handleThemeToggle}
        userName={userData?.user?.full_name || user?.name || 'User'}
        userEmail={userData?.user?.email || user?.email || ''}
        onLogout={handleLogout}
      />

      <div className="flex-1 min-w-0">
        {/* HEADER */}
        <header className="bg-white border-b-2 border-gray-200 px-6 py-6 sticky top-0 z-30 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/revenue/customer-tariffs')} 
                className="p-2 hover:bg-gray-100 rounded-xl transition"
              >
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-gray-800">Add Customer Tariff</h1>
                <span className="text-gray-300 text-xl">/</span>
                <span className="text-sm text-blue-500 font-medium mt-1">New Tariff</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 relative">
              <div className="relative">
                <button onClick={() => setShowSettingsMenu(!showSettingsMenu)} className="p-2 hover:bg-gray-100 rounded-xl transition flex items-center gap-1.5">
                  <Settings size={20} className="text-gray-600" />
                  <ChevronDown size={16} className="text-gray-400" />
                </button>
                {showSettingsMenu && <SettingsMenu />}
              </div>
              <div className="relative">
                <button onClick={() => setShowAddMenu(!showAddMenu)} className="w-9 h-9 rounded-full bg-green-600 text-white flex items-center justify-center hover:bg-green-700 transition shadow-lg shadow-green-500/25">
                  <Plus size={18} />
                </button>
                {showAddMenu && <AddMenu />}
              </div>
            </div>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <div className="p-6 max-w-5xl mx-auto">
          {/* Page Header */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 shadow-sm mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Tag size={24} className="text-green-600" />
                  Create New Customer Tariff
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Set up pricing for a specific customer group (User Group Tariff)
                </p>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-2 px-3 py-2 bg-white border border-green-200 rounded-xl shadow-sm">
                  <Shield size={16} className="text-green-600" />
                  <span className="text-green-700 font-medium">Secure</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-white border border-green-200 rounded-xl shadow-sm">
                  <DollarSign size={16} className="text-green-600" />
                  <span className="text-green-700 font-medium">Pricing</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-white">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Sparkles size={20} className="text-green-600" />
                Tariff Configuration
              </h3>
              <p className="text-sm text-gray-500 mt-1">Configure the pricing and rules for this customer group tariff</p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Customer Group Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Customer Group <span className="text-red-500 text-lg">*</span>
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowGroupDropdown(!showGroupDropdown)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border ${
                      formErrors.group ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'
                    } focus:outline-none focus:ring-2 focus:border-transparent transition bg-gray-50 hover:bg-white`}
                  >
                    <div className="flex items-center gap-3">
                      <Users size={18} className="text-gray-400" />
                      <span className={selectedGroup ? 'text-gray-900' : 'text-gray-400'}>
                        {selectedGroup ? selectedGroup.name : 'Select a customer group'}
                      </span>
                    </div>
                    <ChevronDown size={18} className={`text-gray-400 transition-transform ${showGroupDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {showGroupDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-gray-200 shadow-lg z-50 max-h-60 overflow-y-auto">
                      {userGroups.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">
                          <Users size={24} className="mx-auto mb-2 text-gray-300" />
                          <p className="text-sm">No groups available</p>
                        </div>
                      ) : (
                        userGroups.map((group) => (
                          <button
                            key={group.id}
                            type="button"
                            onClick={() => handleGroupSelect(group)}
                            className={`w-full text-left px-4 py-3 hover:bg-green-50 transition flex items-center gap-3 ${
                              selectedGroup?.id === group.id ? 'bg-green-50 text-green-700' : 'text-gray-700'
                            }`}
                          >
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                              {group.name?.charAt(0) || 'G'}
                            </div>
                            <div>
                              <p className="text-sm font-medium">{group.name}</p>
                              <p className="text-xs text-gray-500">{group.member_count || 0} members</p>
                              <p className="text-xs text-gray-400 mt-0.5">
                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${getStatusColor(group.is_active)}`}>
                                  {getStatusIcon(group.is_active)}
                                  {group.is_active ? 'Active' : 'Inactive'}
                                </span>
                              </p>
                            </div>
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>
                {formErrors.group && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {formErrors.group}
                  </p>
                )}
              </div>

              {/* Hub Selection - Required */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Hub <span className="text-red-500 text-lg">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Layers size={18} />
                  </div>
                  <select
                    name="hub_id"
                    value={formData.hub_id}
                    onChange={handleHubChange}
                    className={`w-full pl-10 pr-10 py-3 rounded-xl border ${
                      formErrors.hub_id ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'
                    } focus:outline-none focus:ring-2 focus:border-transparent transition appearance-none bg-gray-50 hover:bg-white`}
                  >
                    <option value="">Select a hub</option>
                    {loadingHubs ? (
                      <option value="" disabled>Loading hubs...</option>
                    ) : (
                      hubs.map((hub) => (
                        <option key={hub.id} value={hub.id}>
                          {hub.name}
                        </option>
                      ))
                    )}
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
                    <ChevronDown size={18} />
                  </div>
                </div>
                {formErrors.hub_id && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {formErrors.hub_id}
                  </p>
                )}
                <p className="mt-1 text-xs text-gray-400">Select the hub where this tariff will apply</p>
              </div>

              {/* Charger Selection (Optional) - Filtered by Hub */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Charger <span className="text-gray-400 text-sm">(optional)</span>
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Zap size={18} />
                  </div>
                  <select
                    name="charger_id"
                    value={formData.charger_id}
                    onChange={handleChange}
                    className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition appearance-none bg-gray-50 hover:bg-white"
                  >
                    <option value="">Select a charger (optional)</option>
                    {loadingChargers ? (
                      <option value="" disabled>Loading chargers...</option>
                    ) : filteredChargers.length > 0 ? (
                      filteredChargers.map((charger) => (
                        <option key={charger.id} value={charger.id}>
                          {charger.charger_name || charger.charger_id || charger.id}
                        </option>
                      ))
                    ) : (
                      <option value="" disabled>No chargers available for this hub</option>
                    )}
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
                    <ChevronDown size={18} />
                  </div>
                </div>
                <p className="mt-1 text-xs text-gray-400">Optional: Apply tariff to a specific charger</p>
              </div>

              {/* GST Selection (Optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  GST Profile <span className="text-gray-400 text-sm">(optional)</span>
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Receipt size={18} />
                  </div>
                  <select
                    name="gst_id"
                    value={formData.gst_id}
                    onChange={handleChange}
                    className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition appearance-none bg-gray-50 hover:bg-white"
                  >
                    <option value="">Select GST profile (optional)</option>
                    {loadingGST ? (
                      <option value="" disabled>Loading GST profiles...</option>
                    ) : (
                      gstList.map((gst) => (
                        <option key={gst.id} value={gst.id}>
                          {gst.name} (SGST: {gst.sgst_rate}%, CGST: {gst.cgst_rate}%, IGST: {gst.igst_rate}%)
                        </option>
                      ))
                    )}
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
                    <ChevronDown size={18} />
                  </div>
                </div>
                <p className="mt-1 text-xs text-gray-400">Optional: Apply GST rates to this tariff</p>
              </div>

              {/* Price per kWh - Required */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Price per kWh <span className="text-red-500 text-lg">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <IndianRupee size={18} />
                  </div>
                  <input
                    type="number"
                    name="price_per_kwh"
                    value={formData.price_per_kwh}
                    onChange={handleChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                      formErrors.price_per_kwh ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'
                    } focus:outline-none focus:ring-2 focus:border-transparent transition bg-gray-50 hover:bg-white`}
                    required
                  />
                </div>
                {formErrors.price_per_kwh && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {formErrors.price_per_kwh}
                  </p>
                )}
              </div>

              {/* Idle Fee per Minute - Optional */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Idle Fee per Minute
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Clock size={18} />
                  </div>
                  <input
                    type="number"
                    name="idle_fee_per_min"
                    value={formData.idle_fee_per_min}
                    onChange={handleChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                      formErrors.idle_fee_per_min ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'
                    } focus:outline-none focus:ring-2 focus:border-transparent transition bg-gray-50 hover:bg-white`}
                  />
                </div>
                {formErrors.idle_fee_per_min && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {formErrors.idle_fee_per_min}
                  </p>
                )}
                <p className="mt-1 text-xs text-gray-400">Fee charged per minute when charger is idle</p>
              </div>

              {/* Currency */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Currency
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Globe size={18} />
                  </div>
                  <select
                    name="currency"
                    value={formData.currency}
                    onChange={handleChange}
                    className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition appearance-none bg-gray-50 hover:bg-white"
                  >
                    <option value="INR">INR - Indian Rupee</option>
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
                    <ChevronDown size={18} />
                  </div>
                </div>
              </div>

              {/* Date Range (Optional) */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Start Date <span className="text-gray-400 text-sm">(optional)</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <CalendarDays size={18} />
                    </div>
                    <input
                      type="date"
                      name="start_date"
                      value={formData.start_date}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    End Date <span className="text-gray-400 text-sm">(optional)</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <CalendarDays size={18} />
                    </div>
                    <input
                      type="date"
                      name="end_date"
                      value={formData.end_date}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
                    />
                  </div>
                </div>
              </div>
              {formErrors.date_range && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {formErrors.date_range}
                </p>
              )}

              {/* Active Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Status
                </label>
                <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl border border-green-200">
                  <div className="relative">
                    <input
                      type="checkbox"
                      name="is_active"
                      id="is_active"
                      checked={formData.is_active}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div
                      onClick={() => setFormData(prev => ({ ...prev, is_active: !prev.is_active }))}
                      className={`w-12 h-6 rounded-full cursor-pointer transition-colors ${
                        formData.is_active ? 'bg-green-600' : 'bg-gray-300'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white transition-transform ${
                          formData.is_active ? 'translate-x-6' : 'translate-x-0.5'
                        } mt-0.5 shadow-md`}
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      {formData.is_active ? 'Active' : 'Inactive'}
                    </p>
                    <p className="text-xs text-gray-400">
                      {formData.is_active 
                        ? 'Tariff will be available for use' 
                        : 'Tariff will be hidden and inactive'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                <div className="flex items-start gap-3">
                  <Info size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-green-800">What is a Customer Group Tariff?</p>
                    <p className="text-sm text-green-700 mt-1">
                      Customer group tariffs define the pricing structure for specific user groups.
                      This tariff will be applied to all customers belonging to the selected group.
                      You can optionally restrict it to a specific hub, charger, or apply GST rates.
                      The tariff includes price per kWh and optional idle fees with a validity period.
                    </p>
                    <p className="text-sm text-green-700 mt-2">
                      <strong>Note:</strong> This is a User Group Tariff which is applied at the customer group level
                      and can be optionally scoped to a specific hub or charger.
                    </p>
                  </div>
                </div>
              </div>

              {/* Error/Success Messages */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-2 text-red-700">
                  <AlertCircle size={18} className="flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {success && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-2 text-green-700">
                  <CheckCircle size={18} className="flex-shrink-0" />
                  <span>{success}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition flex items-center justify-center gap-2 font-medium shadow-lg shadow-green-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Creating Tariff...
                    </>
                  ) : (
                    <>
                      <Tag size={20} />
                      Create Tariff
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/revenue/customer-tariffs')}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition">
                  <Tag className="w-5 h-5 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900">Group Specific Pricing</h4>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Create custom pricing structures for different customer groups and usage patterns
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition">
                  <CalendarDays className="w-5 h-5 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900">Hub & Charger Specific</h4>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Apply tariffs to specific hubs or individual chargers within the hub
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition">
                  <Receipt className="w-5 h-5 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900">GST Integration</h4>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Automatically apply GST rates (SGST, CGST, IGST) to your tariffs
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCustomerTariff;