src
├─ main.ts
├─ app.module.ts
├─ config
│  └─ orm.config.ts
├─ common
│  ├─ base.entity.ts
│  ├─ decorators
│  │  └─ current-user.decorator.ts
│  ├─ guards
│  │  └─ jwt-auth.guard.ts
│  └─ interfaces
│     └─ paginated-result.interface.ts
├─ auth
│  ├─ auth.module.ts
│  ├─ auth.controller.ts
│  ├─ auth.service.ts
│  ├─ dto
│  │  ├─ login.dto.ts
│  │  └─ register.dto.ts
│  └─ jwt.strategy.ts
├─ users
│  ├─ users.module.ts
│  ├─ users.controller.ts
│  ├─ users.service.ts
│  ├─ dto
│  │  └─ update-user.dto.ts
│  └─ user.entity.ts
├─ tools
│  ├─ tools.module.ts
│  ├─ tools.controller.ts
│  ├─ tools.service.ts
│  ├─ entities
│  │  ├─ tool.entity.ts
│  │  └─ tool-rental-package.entity.ts
├─ workflows
│  ├─ workflows.module.ts
│  ├─ workflows.controller.ts
│  ├─ workflows.service.ts
│  └─ entities
│     ├─ workflow.entity.ts
│     ├─ workflow-test-preset.entity.ts
│     └─ tool-workflow.entity.ts
├─ coupons
│  ├─ coupons.module.ts
│  ├─ coupons.controller.ts
│  ├─ coupons.service.ts
│  └─ entities
│     ├─ coupon.entity.ts
│     └─ coupon-usage.entity.ts
├─ promotions
│  ├─ promotions.module.ts
│  ├─ promotions.controller.ts
│  └─ promotions.service.ts
├─ blog
│  ├─ blog.module.ts
│  ├─ blog.controller.ts
│  ├─ blog.service.ts
│  └─ entities
│     ├─ blog-post.entity.ts
│     ├─ blog-tag.entity.ts
│     └─ blog-post-tag.entity.ts
├─ orders
│  ├─ orders.module.ts
│  ├─ orders.controller.ts
│  ├─ orders.service.ts
│  └─ entities
│     ├─ order.entity.ts
│     └─ order-item.entity.ts
├─ payments
│  ├─ payments.module.ts
│  ├─ payments.service.ts
│  ├─ payments.controller.ts
│  └─ entities
│     ├─ payment.entity.ts
│     └─ payment-method.entity.ts
├─ licenses
│  ├─ licenses.module.ts
│  ├─ licenses.controller.ts
│  ├─ licenses.service.ts
│  └─ license.entity.ts
├─ wallet
│  ├─ wallet.module.ts
│  ├─ wallet.controller.ts
│  ├─ wallet.service.ts
│  └─ entities
│     ├─ user-wallet.entity.ts
│     └─ wallet-transaction.entity.ts
├─ settings
│  ├─ settings.module.ts
│  ├─ settings.controller.ts
│  ├─ settings.service.ts
│  └─ system-setting.entity.ts
└─ support
   ├─ support.module.ts
   ├─ support.controller.ts
   ├─ support.service.ts
   └─ entities
      ├─ support-ticket.entity.ts
      └─ support-message.entity.ts







docker-compose down
docker-compose up -d --build
docker-compose logs -f api
