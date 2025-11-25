const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

async function build() {
    // Create netlify/functions directory
    const functionsDir = path.join(__dirname, 'netlify', 'functions');
    if (!fs.existsSync(functionsDir)) {
        fs.mkdirSync(functionsDir, { recursive: true });
    }

    // Bundle the serverless function
    await esbuild.build({
        entryPoints: ['dist/serverless.js'],
        bundle: true,
        platform: 'node',
        target: 'node18',
        outfile: 'netlify/functions/api.js',
        external: [
            '@nestjs/microservices',
            '@nestjs/websockets',
            'cache-manager',
        ],
        minify: true,
    });

    console.log('✅ Netlify function built successfully!');
}

build().catch((err) => {
    console.error('❌ Build failed:', err);
    process.exit(1);
});
