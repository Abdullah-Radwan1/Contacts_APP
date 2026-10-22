import Contact from '../models/contact.js';

export async function getContacts(request, response) {
  const { page: requestedPage, limit } = request.pagination;
  const totalItems = await Contact.countDocuments();
  const totalPages = Math.ceil(totalItems / limit);
  const page = Math.min(requestedPage, totalPages || 1);
  const contacts = await Contact.find()
    .select('name email phone -_id')
    .sort({ name: 1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  response.json({
    data: contacts,
    pagination: { page, limit, totalItems, totalPages },
  });
}
