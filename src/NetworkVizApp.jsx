import React, { useEffect, useMemo, useState } from 'react';
import { Home, Activity, Users, Settings, Plus, Upload, Search, X, Briefcase, Mail, Phone } from 'lucide-react';

const parseTags = (value) => {
  const tags = value
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);
  return Array.from(new Set(tags));
};

const formatLastContact = (daysAgo) => {
  if (daysAgo <= 0) return 'today';
  if (daysAgo === 1) return '1 day ago';
  if (daysAgo < 7) return `${daysAgo} days ago`;
  const weeks = Math.floor(daysAgo / 7);
  if (weeks === 1) return '1 week ago';
  return `${weeks} weeks ago`;
};

const initialContacts = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah.chen@techcorp.com',
    phone: '+1 415-555-0123',
    company: 'TechCorp AI',
    title: 'VP of Engineering',
    tags: ['Tech', 'AI', 'Investor'],
    strength: 'strong',
    lastContactDaysAgo: 2,
    activity: 'Posted about new AI model launch',
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    email: 'marcus@startup.io',
    phone: '+1 510-555-0198',
    company: 'StartupIO',
    title: 'Founder & CEO',
    tags: ['Entrepreneur', 'SaaS'],
    strength: 'strong',
    lastContactDaysAgo: 7,
    activity: 'Company raised Series A',
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    email: 'elena.r@designstudio.com',
    phone: '+1 415-555-0167',
    company: 'Creative Studio',
    title: 'Creative Director',
    tags: ['Design', 'Creative'],
    strength: 'medium',
    lastContactDaysAgo: 21,
    activity: 'Shared article about design trends',
  },
  {
    id: '4',
    name: 'David Kim',
    email: 'dkim@venture.capital',
    phone: '+1 650-555-0145',
    company: 'Summit Ventures',
    title: 'Partner',
    tags: ['VC', 'Investor', 'Mentor'],
    strength: 'strong',
    lastContactDaysAgo: 5,
    activity: 'Looking for climate tech startups',
  },
  {
    id: '5',
    name: 'Priya Sharma',
    email: 'priya@healthtech.co',
    phone: '+1 408-555-0134',
    company: 'HealthTech Solutions',
    title: 'Product Manager',
    tags: ['Healthcare', 'Product'],
    strength: 'medium',
    lastContactDaysAgo: 14,
    activity: 'Changed job to HealthTech Solutions',
  },
  {
    id: '6',
    name: 'Alex Thompson',
    email: 'alex.t@media.com',
    phone: '+1 415-555-0189',
    company: 'Media Corp',
    title: 'Senior Journalist',
    tags: ['Media', 'Press'],
    strength: 'weak',
    lastContactDaysAgo: 60,
    activity: 'Published article on tech regulation',
  },
  {
    id: '7',
    name: 'Lisa Wang',
    email: 'lwang@university.edu',
    phone: '+1 510-555-0156',
    company: 'Stanford University',
    title: 'Professor of CS',
    tags: ['Academia', 'AI', 'Research'],
    strength: 'medium',
    lastContactDaysAgo: 30,
    activity: 'Published new research paper',
  },
  {
    id: '8',
    name: 'James Miller',
    email: 'james@consulting.com',
    phone: '+1 415-555-0178',
    company: 'Strategy Consulting',
    title: 'Senior Consultant',
    tags: ['Consulting', 'Strategy'],
    strength: 'weak',
    lastContactDaysAgo: 90,
    activity: null,
  },
  {
    id: '9',
    name: 'Aisha Patel',
    email: 'aisha@fintech.io',
    phone: '+1 628-555-0142',
    company: 'FinTech Innovations',
    title: 'Head of Product',
    tags: ['FinTech', 'Product', 'Crypto'],
    strength: 'strong',
    lastContactDaysAgo: 4,
    activity: 'Spoke at FinTech conference',
  },
  {
    id: '10',
    name: 'Robert Garcia',
    email: 'robert.g@legal.com',
    phone: '+1 415-555-0191',
    company: 'Garcia & Partners',
    title: 'Partner',
    tags: ['Legal', 'Startup Law'],
    strength: 'medium',
    lastContactDaysAgo: 14,
    activity: null,
  },
  {
    id: '11',
    name: 'Nina Kowalski',
    email: 'nina@ecommerce.com',
    phone: '+1 510-555-0173',
    company: 'E-Commerce Plus',
    title: 'CMO',
    tags: ['Marketing', 'E-commerce'],
    strength: 'weak',
    lastContactDaysAgo: 120,
    activity: null,
  },
  {
    id: '12',
    name: 'Tom Anderson',
    email: 'tom@blockchain.xyz',
    phone: '+1 415-555-0165',
    company: 'BlockChain Labs',
    title: 'CTO',
    tags: ['Tech', 'Blockchain', 'Web3'],
    strength: 'medium',
    lastContactDaysAgo: 10,
    activity: 'Launched new DeFi protocol',
  },
  {
    id: '13',
    name: 'Sophie Laurent',
    email: 'sophie@fashion.fr',
    phone: '+33 1 23 45 67 89',
    company: 'Fashion Forward',
    title: 'Brand Director',
    tags: ['Fashion', 'Luxury'],
    strength: 'weak',
    lastContactDaysAgo: 150,
    activity: null,
  },
  {
    id: '14',
    name: 'Michael Chang',
    email: 'mchang@robotics.ai',
    phone: '+1 650-555-0188',
    company: 'Robotics AI',
    title: 'Senior Engineer',
    tags: ['Robotics', 'AI', 'Hardware'],
    strength: 'medium',
    lastContactDaysAgo: 7,
    activity: "Demo'd new robot prototype",
  },
  {
    id: '15',
    name: 'Emma Wilson',
    email: 'emma@nonprofit.org',
    phone: '+1 415-555-0152',
    company: 'Tech for Good',
    title: 'Executive Director',
    tags: ['Nonprofit', 'Social Impact'],
    strength: 'strong',
    lastContactDaysAgo: 3,
    activity: 'Organizing charity fundraiser',
  },
];

const getStrengthColor = (strength) => {
  switch (strength) {
    case 'strong':
      return 'bg-green-500';
    case 'medium':
      return 'bg-blue-500';
    case 'weak':
      return 'bg-gray-400';
    default:
      return 'bg-gray-300';
  }
};

const ContactDetail = ({
  contact,
  tagsInput,
  onTagsChange,
  onClose,
  onLogInteraction,
  onSaveTags,
  onDelete,
}) => {
  if (!contact) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-indigo-200 mt-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{contact.name}</h3>
          <p className="text-gray-600">
            {contact.title} at {contact.company}
          </p>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600" aria-label="Close contact details">
          <X size={20} />
        </button>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <Mail size={16} />
          <span>{contact.email}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Phone size={16} />
          <span>{contact.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Briefcase size={16} />
          <span>{contact.company}</span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {contact.tags.map((tag, i) => (
          <span key={i} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t space-y-2">
        <p className="text-sm text-gray-500">Last contact: {formatLastContact(contact.lastContactDaysAgo)}</p>
        {contact.activity && <p className="text-sm text-gray-700">Recent: {contact.activity}</p>}
      </div>

      <div className="mt-4 space-y-3">
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={onLogInteraction}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
          >
            Log interaction
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
          >
            Delete contact
          </button>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={tagsInput}
            onChange={(e) => onTagsChange(e.target.value)}
            placeholder="Tags (comma separated)"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
          />
          <button
            onClick={onSaveTags}
            className="px-3 py-2 bg-gray-900 text-white rounded-lg hover:bg-black transition-colors text-sm"
          >
            Save tags
          </button>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const NetworkVizApp = () => {
  const [activeTab, setActiveTab] = useState('map');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddContact, setShowAddContact] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [contacts, setContacts] = useState(initialContacts);
  const [newContact, setNewContact] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    title: '',
    tags: [],
  });
  const [newContactTagsInput, setNewContactTagsInput] = useState('');
  const [newContactError, setNewContactError] = useState('');
  const [detailTagsInput, setDetailTagsInput] = useState('');

  const selectedContact = useMemo(
    () => contacts.find((contact) => contact.id === selectedContactId) || null,
    [contacts, selectedContactId]
  );

  useEffect(() => {
    setDetailTagsInput(selectedContact ? selectedContact.tags.join(', ') : '');
  }, [selectedContact]);

  const feedItems = useMemo(
    () =>
      contacts
        .filter((c) => c.activity)
        .map((c) => ({ contact: c, activity: c.activity, time: c.lastContactDaysAgo }))
        .sort((a, b) => a.time - b.time),
    [contacts]
  );

  const filteredContacts = useMemo(
    () =>
      contacts.filter((contact) => {
        const query = searchQuery.toLowerCase();
        return (
          contact.name.toLowerCase().includes(query) ||
          contact.company.toLowerCase().includes(query) ||
          contact.tags.some((tag) => tag.toLowerCase().includes(query))
        );
      }),
    [contacts, searchQuery]
  );

  const handleAddContact = () => {
    if (!newContact.name.trim()) {
      setNewContactError('Name is required');
      return;
    }

    const id =
      typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : `contact-${Date.now()}-${Math.random().toString(16).slice(2)}`;

    const contactToAdd = {
      ...newContact,
      id,
      strength: 'weak',
      lastContactDaysAgo: 0,
      activity: null,
      tags: newContact.tags,
    };

    setContacts((prev) => [contactToAdd, ...prev]);
    setShowAddContact(false);
    setNewContact({ name: '', email: '', phone: '', company: '', title: '', tags: [] });
    setNewContactTagsInput('');
    setNewContactError('');
  };

  const handleTagsInputChange = (value) => {
    setNewContactTagsInput(value);
    setNewContact((prev) => ({ ...prev, tags: parseTags(value) }));
  };

  const handleLogInteraction = (contactId) => {
    const note = window.prompt('Describe the interaction (optional):')?.trim();

    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === contactId
          ? {
              ...contact,
              lastContactDaysAgo: 0,
              activity: note || contact.activity,
            }
          : contact
      )
    );
    setSelectedContactId(contactId);
  };

  const handleSaveTags = (contactId) => {
    const parsedTags = parseTags(detailTagsInput);
    setContacts((prev) =>
      prev.map((contact) => (contact.id === contactId ? { ...contact, tags: parsedTags } : contact))
    );
    setSelectedContactId(contactId);
    setDetailTagsInput(parsedTags.join(', '));
  };

  const handleDeleteContact = (contactId) => {
    const contact = contacts.find((c) => c.id === contactId);
    if (!contact) return;
    const shouldDelete = window.confirm(`Delete ${contact.name}?`);
    if (!shouldDelete) return;

    setContacts((prev) => prev.filter((c) => c.id !== contactId));
    setSelectedContactId(null);
  };

  const CircleNode = ({ contact, radius, angle, total, index, showLabels }) => {
    const x = 50 + radius * Math.cos((angle * index) / total - Math.PI / 2);
    const y = 50 + radius * Math.sin((angle * index) / total - Math.PI / 2);

    return (
      <g
        onClick={() => setSelectedContactId(contact.id)}
        className="cursor-pointer transition-all hover:opacity-80 group"
      >
        <circle
          cx={`${x}%`}
          cy={`${y}%`}
          r="3%"
          className={`${getStrengthColor(contact.strength)} transition-all`}
          strokeWidth="2"
          stroke="white"
        />
        <text
          x={`${x}%`}
          y={`${y + 5}%`}
          textAnchor="middle"
          className={`fill-gray-700 text-xs font-medium pointer-events-none ${
            showLabels || contact.id === selectedContact?.id ? '' : 'opacity-0 group-hover:opacity-100'
          }`}
          style={{ fontSize: '0.65rem' }}
        >
          {contact.name.split(' ')[0]}
        </text>
      </g>
    );
  };

  const MapView = () => {
    const strongContacts = contacts.filter((c) => c.strength === 'strong');
    const mediumContacts = contacts.filter((c) => c.strength === 'medium');
    const weakContacts = contacts.filter((c) => c.strength === 'weak');
    const showLabels = contacts.length <= 30;

    return (
      <div className="flex-1 bg-gradient-to-br from-indigo-50 to-blue-50 p-6 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Network Map</h2>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-4">
            <div className="flex gap-4 mb-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Strong ({strongContacts.length})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span>Medium ({mediumContacts.length})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                <span>Weak ({weakContacts.length})</span>
              </div>
            </div>

            <svg viewBox="0 0 100 100" className="w-full h-96">
              <circle cx="50" cy="50" r="15" fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="30" fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="0.5" />

              <circle cx="50" cy="50" r="4" className="fill-indigo-600" />
              <text x="50" y="57" textAnchor="middle" className="fill-gray-700 text-xs font-bold">
                You
              </text>

              {strongContacts.map((contact, index) => (
                <CircleNode
                  key={contact.id}
                  contact={contact}
                  radius={15}
                  angle={2 * Math.PI}
                  total={strongContacts.length}
                  index={index}
                  showLabels={showLabels}
                />
              ))}

              {mediumContacts.map((contact, index) => (
                <CircleNode
                  key={contact.id}
                  contact={contact}
                  radius={30}
                  angle={2 * Math.PI}
                  total={mediumContacts.length}
                  index={index}
                  showLabels={showLabels}
                />
              ))}

              {weakContacts.map((contact, index) => (
                <CircleNode
                  key={contact.id}
                  contact={contact}
                  radius={45}
                  angle={2 * Math.PI}
                  total={weakContacts.length}
                  index={index}
                  showLabels={showLabels}
                />
              ))}
            </svg>
          </div>
        </div>
      </div>
    );
  };

  const FeedView = () => (
    <div className="flex-1 bg-gray-50 p-6 overflow-auto">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Activity Feed</h2>

        <div className="space-y-4">
          {feedItems.map((item) => (
            <div key={item.contact.id} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div
                  className={`w-10 h-10 rounded-full ${getStrengthColor(
                    item.contact.strength
                  )} flex items-center justify-center text-white font-semibold`}
                >
                  {item.contact.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-800">{item.contact.name}</h3>
                    <span className="text-xs text-gray-500">{formatLastContact(item.time)}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {item.contact.title} at {item.contact.company}
                  </p>
                  <p className="text-gray-800">{item.activity}</p>
                  <div className="flex gap-2 mt-3">
                    {item.contact.tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ContactsView = () => (
    <div className="flex-1 bg-gray-50 p-6 overflow-auto">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Contacts</h2>
          <div className="flex gap-2">
            <button
              type="button"
              disabled
              className="flex items-center gap-2 px-4 py-2 bg-blue-200 text-white rounded-lg cursor-not-allowed"
            >
              <Upload size={18} />
              Import
            </button>
            <button
              onClick={() => setShowAddContact(true)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Plus size={18} />
              Add Contact
            </button>
          </div>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search contacts by name, company, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="divide-y">
            {filteredContacts.map((contact) => (
              <button
                key={contact.id}
                onClick={() => setSelectedContactId(contact.id)}
                className="p-4 hover:bg-gray-50 transition-colors w-full text-left"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div
                      className={`w-12 h-12 rounded-full ${getStrengthColor(
                        contact.strength
                      )} flex items-center justify-center text-white font-semibold text-lg`}
                    >
                      {contact.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 text-lg">{contact.name}</h3>
                      <p className="text-gray-600 text-sm">{contact.title}</p>
                      <p className="text-gray-500 text-sm">{contact.company}</p>

                      <div className="mt-2 space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail size={14} />
                          <span>{contact.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone size={14} />
                          <span>{contact.phone}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-3">
                        {contact.tags.map((tag, i) => (
                          <span key={i} className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded text-xs font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500">Last contact</span>
                    <p className="text-sm font-medium text-gray-700">{formatLastContact(contact.lastContactDaysAgo)}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {showAddContact && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Add New Contact</h3>
                <button
                  onClick={() => {
                    setShowAddContact(false);
                    setNewContact({ name: '', email: '', phone: '', company: '', title: '', tags: [] });
                    setNewContactTagsInput('');
                    setNewContactError('');
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input
                    type="text"
                    value={newContact.name}
                    onChange={(e) => {
                      setNewContact((prev) => ({ ...prev, name: e.target.value }));
                      if (newContactError) setNewContactError('');
                    }}
                    placeholder="John Doe"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  {newContactError && <p className="text-sm text-red-600 mt-1">{newContactError}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={newContact.email}
                    onChange={(e) => setNewContact((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="john@example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={newContact.phone}
                    onChange={(e) => setNewContact((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="+1 415-555-0123"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input
                    type="text"
                    value={newContact.company}
                    onChange={(e) => setNewContact((prev) => ({ ...prev, company: e.target.value }))}
                    placeholder="Company Name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={newContact.title}
                    onChange={(e) => setNewContact((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="CEO, Engineer, Designer..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                  <input
                    type="text"
                    value={newContactTagsInput}
                    onChange={(e) => handleTagsInputChange(e.target.value)}
                    placeholder="Tech, Investor, Friend (comma separated)"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowAddContact(false);
                    setNewContact({ name: '', email: '', phone: '', company: '', title: '', tags: [] });
                    setNewContactTagsInput('');
                    setNewContactError('');
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddContact}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Add Contact
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const SettingsView = () => (
    <div className="flex-1 bg-gray-50 p-6 overflow-auto">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Settings</h2>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Connected Accounts</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center text-white font-bold">in</div>
                  <div>
                    <p className="font-medium text-gray-800">LinkedIn</p>
                    <p className="text-sm text-gray-500">Not connected</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  Connect
                </button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-600 rounded flex items-center justify-center text-white font-bold">G</div>
                  <div>
                    <p className="font-medium text-gray-800">Gmail</p>
                    <p className="text-sm text-gray-500">Not connected</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm">
                  Connect
                </button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-700 rounded flex items-center justify-center text-white font-bold">📱</div>
                  <div>
                    <p className="font-medium text-gray-800">Phone Contacts</p>
                    <p className="text-sm text-gray-500">Not connected</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm">
                  Import
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">Email Notifications</p>
                  <p className="text-sm text-gray-500">Get notified about network updates</p>
                </div>
                <label className="relative inline-block w-12 h-6">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-12 h-6 bg-gray-300 peer-checked:bg-indigo-600 rounded-full peer transition-all"></div>
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-6"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">Activity Reminders</p>
                  <p className="text-sm text-gray-500">Remind me to stay in touch</p>
                </div>
                <label className="relative inline-block w-12 h-6">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-12 h-6 bg-gray-300 peer-checked:bg-indigo-600 rounded-full peer transition-all"></div>
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-6"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">About</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <strong>Version:</strong> 1.0.0 (MVP)
              </p>
              <p>
                <strong>Total Contacts:</strong> {contacts.length}
              </p>
              <p>
                <strong>Active This Month:</strong>{' '}
                {
                  contacts.filter((c) => c.lastContactDaysAgo <= 30).length
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="flex-1 overflow-hidden">
        {activeTab === 'map' && <MapView />}
        {activeTab === 'feed' && <FeedView />}
        {activeTab === 'contacts' && <ContactsView />}
        {activeTab === 'settings' && <SettingsView />}
      </div>

      {selectedContact && (
        <div className="px-6 pb-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <ContactDetail
              contact={selectedContact}
              tagsInput={detailTagsInput}
              onTagsChange={setDetailTagsInput}
              onClose={() => setSelectedContactId(null)}
              onLogInteraction={() => handleLogInteraction(selectedContact.id)}
              onSaveTags={() => handleSaveTags(selectedContact.id)}
              onDelete={() => handleDeleteContact(selectedContact.id)}
            />
          </div>
        </div>
      )}

      <div className="border-t border-gray-200 bg-white">
        <div className="flex justify-around items-center h-16">
          <button
            onClick={() => setActiveTab('map')}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              activeTab === 'map' ? 'text-indigo-600' : 'text-gray-500'
            }`}
          >
            <Home size={24} />
            <span className="text-xs mt-1">Map</span>
          </button>

          <button
            onClick={() => setActiveTab('feed')}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              activeTab === 'feed' ? 'text-indigo-600' : 'text-gray-500'
            }`}
          >
            <Activity size={24} />
            <span className="text-xs mt-1">Feed</span>
          </button>

          <button
            onClick={() => setActiveTab('contacts')}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              activeTab === 'contacts' ? 'text-indigo-600' : 'text-gray-500'
            }`}
          >
            <Users size={24} />
            <span className="text-xs mt-1">Contacts</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              activeTab === 'settings' ? 'text-indigo-600' : 'text-gray-500'
            }`}
          >
            <Settings size={24} />
            <span className="text-xs mt-1">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NetworkVizApp;
