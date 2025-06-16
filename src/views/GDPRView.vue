<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="auto_container">
      <div class="bg-white shadow-lg rounded-lg overflow-hidden">
        <!-- Header -->
        <div class="bg-[#223A60] px-6 py-8">
          <h1 class="text-3xl font-bold text-white text-center">GDPR Compliance</h1>
          <p class="text-blue-100 text-center mt-2">Last Updated: 15.06.2025</p>
        </div>

        <!-- Content -->
        <div class="px-6 py-8 space-y-8">
          <!-- Introduction -->
          <div class="prose max-w-none">
            <p class="text-gray-600 leading-relaxed">
              Fly Ashgabat is committed to ensuring the security and protection of the personal information that we process, and to provide a compliant and consistent approach to data protection. We have always had a robust and effective data protection program in place which complies with existing law and abides by the data protection principles.
            </p>
          </div>

          <!-- Data Protection Principles -->
          <div class="space-y-4">
            <h2 class="text-2xl font-semibold text-gray-800">1. Data Protection Principles</h2>
            <div class="bg-gray-50 p-6 rounded-lg">
              <ul class="list-disc list-inside space-y-2 text-gray-600">
                <li>We process personal data lawfully, fairly, and transparently.</li>
                <li>We collect personal data only for specified, explicit, and legitimate purposes.</li>
                <li>We process personal data only as necessary for the purposes for which it was collected.</li>
                <li>We ensure personal data is accurate and up to date.</li>
                <li>We store personal data only for as long as necessary.</li>
                <li>We process personal data in a manner that ensures appropriate security.</li>
              </ul>
            </div>
          </div>

          <!-- Your Rights -->
          <div class="space-y-4">
            <h2 class="text-2xl font-semibold text-gray-800">2. Your Rights</h2>
            <div class="bg-gray-50 p-6 rounded-lg">
              <ul class="list-disc list-inside space-y-2 text-gray-600">
                <li>You have the right to access your personal data.</li>
                <li>You have the right to request the correction of inaccurate personal data.</li>
                <li>You have the right to request the erasure of your personal data.</li>
                <li>You have the right to object to the processing of your personal data.</li>
                <li>You have the right to request the restriction of processing your personal data.</li>
                <li>You have the right to data portability.</li>
              </ul>
            </div>
          </div>

          <!-- Contact -->
          <div class="space-y-4">
            <h2 class="text-2xl font-semibold text-gray-800">3. Contact Us</h2>
            <div class="bg-gray-50 p-6 rounded-lg">
              <p class="text-gray-600">
                If you have any questions about our GDPR compliance, please contact us at:
              </p>
              <a href="mailto:info@flyashgabat.com" class="text-blue-600 hover:text-blue-800 mt-2 inline-block">
                📧 info@flyashgabat.com
              </a>
              <p class="text-gray-600 mt-2">
                📞 +1-425-517-9454
              </p>
              <p class="text-gray-600 mt-2">
                📍 9407 Ne Vancouver Mall Dr, Ste 104 #2304, Vancouver, WA, 98662, USA
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GDPRView'
}
</script> 