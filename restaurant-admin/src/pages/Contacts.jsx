import { useEffect, useState } from 'react';
import { Eye, Mail, Phone, User } from 'lucide-react';
import toast from 'react-hot-toast';

import AdminLayout from '../components/layout/AdminLayout';
import api from '../services/api';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);

  const fetchContacts = async () => {
    try {
      const response = await api.get('/contact/admin');

      setContacts(response.data.contacts);
    } catch (error) {
      console.error('failed to fetch contacts:', error);

      toast.error('failed to load contacts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <AdminLayout>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Contact Messages</h1>

          <p className="mt-1 text-gray-500">
            View messages submitted by customers.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
            Loading contacts...
          </div>
        )}

        {/* Empty */}
        {!loading && contacts.length === 0 && (
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
            <Mail className="mx-auto text-gray-400" size={40} />

            <h2 className="mt-4 text-lg font-semibold text-gray-800">
              No contact messages
            </h2>

            <p className="mt-1 text-gray-500">
              Customer messages will appear here.
            </p>
          </div>
        )}

        {/* Contacts */}
        {!loading && contacts.length > 0 && (
          <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Customer
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Subject
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Date
                    </th>

                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {contacts.map((contact) => (
                    <tr
                      key={contact.id}
                      className="transition hover:bg-gray-50"
                    >
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">
                          {contact.name}
                        </div>

                        <div className="text-sm text-gray-500">
                          {contact.email}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="font-medium text-gray-700">
                          {contact.subject}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(contact.created_at).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedContact(contact)}
                          className="inline-flex items-center gap-2 rounded-lg bg-orange-50 px-3 py-2 text-sm font-semibold text-orange-500 transition hover:bg-orange-100"
                        >
                          <Eye size={17} />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Contact Details Modal */}
      {selectedContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Contact Message
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Message #{selectedContact.id}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedContact(null)}
                className="rounded-lg px-3 py-2 text-gray-500 hover:bg-gray-100"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex gap-3">
                <User size={19} className="mt-1 text-orange-500" />

                <div>
                  <p className="text-xs font-semibold uppercase text-gray-400">
                    Name
                  </p>

                  <p className="font-medium text-gray-800">
                    {selectedContact.name}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Mail size={19} className="mt-1 text-orange-500" />

                <div>
                  <p className="text-xs font-semibold uppercase text-gray-400">
                    Email
                  </p>

                  <p className="font-medium text-gray-800">
                    {selectedContact.email}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase text-gray-400">
                  Subject
                </p>

                <p className="mt-1 font-medium text-gray-800">
                  {selectedContact.subject}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase text-gray-400">
                  Message
                </p>

                <div className="mt-2 rounded-xl bg-gray-50 p-4 text-sm leading-6 text-gray-700">
                  {selectedContact.message}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedContact(null)}
              className="mt-6 w-full rounded-xl bg-gray-900 px-4 py-3 font-semibold text-white transition hover:bg-gray-800"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Contacts;
