<template>
  <div class="min-h-screen mt-[150px] pt-[50px] pb-[100px] px-4 sm:px-6 lg:px-8">
    <div class="auto_container">
      <div class="bg-white shadow-lg rounded-lg overflow-hidden">
        <!-- Header -->
        <div class="bg-[#223A60] px-6 py-8">
          <h1 class="text-3xl font-bold text-white text-center">GDPR Compliance Statement</h1>
          <p class="text-blue-100 text-center mt-2">Last Updated: 15.06.2025</p>
        </div>

        <!-- Content -->
        <div class="px-6 py-8 space-y-8">
          <!-- Introduction -->
          <div class="prose max-w-none">
            <p class="text-gray-600 leading-relaxed">
              Fly Ashgabat is committed to protecting the privacy and personal data of users in compliance with 
              the General Data Protection Regulation (GDPR) (EU) 2016/679. This statement outlines your rights 
              under GDPR and how we handle personal data of users in the European Union (EU) and European Economic Area (EEA).
            </p>
          </div>

          <!-- Legal Basis -->
          <div class="space-y-4">
            <h2 class="text-2xl font-semibold text-gray-800">1. Legal Basis for Processing</h2>
            <div class="bg-gray-50 p-6 rounded-lg">
              <p class="text-gray-600 mb-4">We process personal data only when:</p>
              <ul class="list-disc list-inside space-y-2 text-gray-600">
                <li>You have given clear consent</li>
                <li>It is required to fulfill a contract (e.g., booking a flight)</li>
                <li>It is necessary for our legal obligations</li>
                <li>It is in our legitimate interests, such as improving services or preventing fraud (balanced with your rights)</li>
              </ul>
            </div>
          </div>

          <!-- GDPR Rights -->
          <div class="space-y-4">
            <h2 class="text-2xl font-semibold text-gray-800">2. Your GDPR Rights</h2>
            <div class="bg-gray-50 p-6 rounded-lg">
              <p class="text-gray-600 mb-4">
                If you are located in the EU/EEA, you have the following rights regarding your personal data:
              </p>
              <ul class="list-disc list-inside space-y-2 text-gray-600">
                <li>Right to Access – Request a copy of your personal data</li>
                <li>Right to Rectification – Request correction of inaccurate or incomplete data</li>
                <li>Right to Erasure – Request deletion of your data ("right to be forgotten")</li>
                <li>Right to Restrict Processing – Ask us to limit how we use your data</li>
                <li>Right to Data Portability – Request to transfer your data to another provider</li>
                <li>Right to Object – Object to processing based on legitimate interests or for direct marketing</li>
                <li>Right to Withdraw Consent – Withdraw consent at any time (for data we process based on consent)</li>
              </ul>
              <p class="text-gray-600 mt-4">
                To exercise these rights, email us at privacy@flyashgabat.com. We will respond within 30 days as required by GDPR.
              </p>
            </div>
          </div>

          <!-- International Data Transfers -->
          <div class="space-y-4">
            <h2 class="text-2xl font-semibold text-gray-800">3. International Data Transfers</h2>
            <div class="bg-gray-50 p-6 rounded-lg">
              <p class="text-gray-600 mb-4">
                Your data may be processed outside the EU, including in countries that may not offer the same level of data protection. 
                When we transfer data internationally, we ensure appropriate safeguards such as:
              </p>
              <ul class="list-disc list-inside space-y-2 text-gray-600">
                <li>Standard Contractual Clauses (SCCs)</li>
                <li>Data processing agreements with third-party vendors</li>
              </ul>
            </div>
          </div>

          <!-- Data Security -->
          <div class="space-y-4">
            <h2 class="text-2xl font-semibold text-gray-800">4. Data Security & Storage</h2>
            <div class="bg-gray-50 p-6 rounded-lg">
              <p class="text-gray-600">
                We use technical and organizational measures (e.g., encryption, firewalls, access controls) to protect your data. 
                Personal data is stored only as long as needed for the purpose it was collected or as required by law.
              </p>
            </div>
          </div>

          <!-- Data Collection -->
          <div class="space-y-4">
            <h2 class="text-2xl font-semibold text-gray-800">5. Data Collection Overview</h2>
            <div class="bg-gray-50 p-6 rounded-lg">
              <p class="text-gray-600 mb-4">
                We collect personal data only for specific, legitimate purposes. Examples include:
              </p>
              <ul class="list-disc list-inside space-y-2 text-gray-600">
                <li>Processing bookings and payments</li>
                <li>Providing customer support</li>
                <li>Sending booking confirmations</li>
                <li>Complying with legal requirements</li>
              </ul>
              <p class="text-gray-600 mt-4">For more detail, see our Privacy Policy.</p>
            </div>
          </div>

          <!-- Complaints -->
          <div class="space-y-4">
            <h2 class="text-2xl font-semibold text-gray-800">6. Complaints</h2>
            <div class="bg-gray-50 p-6 rounded-lg">
              <p class="text-gray-600">
                If you believe your data has been misused, you have the right to file a complaint with your local 
                data protection authority in the EU.
              </p>
            </div>
          </div>

          <!-- Contact -->
          <div class="space-y-4">
            <h2 class="text-2xl font-semibold text-gray-800">Contact</h2>
            <div class="bg-gray-50 p-6 rounded-lg">
              <p class="text-gray-600">
                If you have any questions or concerns about GDPR or your data privacy, please contact us at:
              </p>
              <a href="mailto:dev@flyashgabat.com" class="text-blue-600 hover:text-blue-800 mt-2 inline-block">
                📧 dev@flyashgabat.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GDPView'
}
</script>
  
