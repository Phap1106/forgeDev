CREATE TABLE `users` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(255) UNIQUE NOT NULL,
  `username` varchar(255),
  `password_hash` varchar(255) NOT NULL,
  `full_name` varchar(255),
  `role` varchar(255) NOT NULL DEFAULT 'user' COMMENT 'user, admin',
  `status` varchar(255) NOT NULL DEFAULT 'active',
  `avatar_url` varchar(255),
  `last_login_at` timestamp,
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `user_sessions` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `user_id` integer NOT NULL,
  `token` varchar(255) UNIQUE NOT NULL,
  `user_agent` varchar(255),
  `ip_address` varchar(255),
  `expires_at` timestamp,
  `created_at` timestamp
);

CREATE TABLE `password_reset_tokens` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `user_id` integer NOT NULL,
  `token` varchar(255) UNIQUE NOT NULL,
  `expires_at` timestamp,
  `used_at` timestamp,
  `created_at` timestamp
);

CREATE TABLE `tools` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) UNIQUE NOT NULL,
  `category` varchar(255),
  `base_price_vnd` integer NOT NULL COMMENT 'Giá gốc theo VND',
  `display_price_label` varchar(255) COMMENT 'VD: $39 / lifetime',
  `delivery_type` varchar(255) NOT NULL COMMENT 'online, download',
  `billing_mode` varchar(255) NOT NULL DEFAULT 'one_time' COMMENT 'one_time, rental',
  `description` text,
  `hero_image_url` varchar(255),
  `hero_badge` varchar(255),
  `difficulty` varchar(255),
  `environment` varchar(255),
  `update_policy` varchar(255),
  `suited_for` text COMMENT 'danh sách bullet, có thể lưu dạng text hoặc JSON',
  `visibility` varchar(255) NOT NULL DEFAULT 'public' COMMENT 'public, admin',
  `status` varchar(255) NOT NULL DEFAULT 'draft' COMMENT 'draft, active, archived',
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `tool_rental_packages` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `tool_id` integer NOT NULL,
  `code` varchar(255) NOT NULL COMMENT '1d, 7d, 1m, 3m, 1y, ...',
  `label` varchar(255) NOT NULL,
  `duration_hours` integer NOT NULL,
  `price_vnd` integer NOT NULL,
  `is_default` boolean DEFAULT false,
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `workflows` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) UNIQUE NOT NULL,
  `description` text,
  `type` varchar(255) NOT NULL COMMENT 'chatbot, video_downloader, http, file_processor, other',
  `visibility` varchar(255) NOT NULL DEFAULT 'admin',
  `status` varchar(255) NOT NULL DEFAULT 'draft' COMMENT 'draft, active, archived',
  `tags` text COMMENT 'có thể lưu dạng chuỗi hoặc JSON',
  `n8n_workflow_id` varchar(255),
  `webhook_url` varchar(255),
  `json_url` varchar(255),
  `json_file_name` varchar(255),
  `test_mode` varchar(255) NOT NULL COMMENT 'chat, url, json, file',
  `test_sample_payload` text,
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `workflow_test_presets` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `workflow_id` integer NOT NULL,
  `label` varchar(255) NOT NULL,
  `payload` text COMMENT 'sample JSON / message / url',
  `created_at` timestamp
);

CREATE TABLE `tool_workflows` (
  `tool_id` integer NOT NULL,
  `workflow_id` integer NOT NULL,
  `created_at` timestamp,
  PRIMARY KEY (`tool_id`, `workflow_id`)
);

CREATE TABLE `coupons` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `code` varchar(255) UNIQUE NOT NULL,
  `name` varchar(255),
  `description` text,
  `type` varchar(255) NOT NULL COMMENT 'percent, fixed',
  `value` integer NOT NULL COMMENT 'percent hoặc số tiền VND',
  `max_discount` integer,
  `min_order_amount` integer,
  `max_uses` integer,
  `used_count` integer DEFAULT 0,
  `per_user_limit` integer,
  `start_date` timestamp,
  `end_date` timestamp,
  `status` varchar(255) NOT NULL DEFAULT 'draft',
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `coupon_usages` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `coupon_id` integer NOT NULL,
  `user_id` integer NOT NULL,
  `order_id` integer NOT NULL,
  `used_at` timestamp
);

CREATE TABLE `promotions` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `banner_image_url` varchar(255),
  `link_url` varchar(255),
  `start_date` timestamp,
  `end_date` timestamp,
  `status` varchar(255) NOT NULL DEFAULT 'draft',
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `blog_posts` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `author_id` integer,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) UNIQUE NOT NULL,
  `excerpt` text,
  `content` text,
  `cover_image_url` varchar(255),
  `thumbnail_url` varchar(255),
  `video_url` varchar(255),
  `status` varchar(255) NOT NULL DEFAULT 'draft',
  `scheduled_at` timestamp,
  `published_at` timestamp,
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `blog_tags` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) UNIQUE NOT NULL,
  `slug` varchar(255) UNIQUE NOT NULL
);

CREATE TABLE `blog_post_tags` (
  `post_id` integer NOT NULL,
  `tag_id` integer NOT NULL,
  PRIMARY KEY (`post_id`, `tag_id`)
);

CREATE TABLE `orders` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `user_id` integer NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending' COMMENT 'pending, paid, cancelled, refunded',
  `subtotal_amount` integer NOT NULL,
  `discount_amount` integer DEFAULT 0,
  `total_amount` integer NOT NULL,
  `currency` varchar(255) DEFAULT 'VND',
  `coupon_id` integer,
  `payment_method_id` integer,
  `note` text,
  `created_at` timestamp,
  `updated_at` timestamp,
  `paid_at` timestamp
);

CREATE TABLE `order_items` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `order_id` integer NOT NULL,
  `product_type` varchar(255) NOT NULL COMMENT 'tool hoặc workflow',
  `product_id` integer NOT NULL,
  `name_snapshot` varchar(255) NOT NULL,
  `price_snapshot` integer NOT NULL,
  `quantity` integer NOT NULL DEFAULT 1,
  `billing_type` varchar(255) COMMENT 'one_time, rental, trial',
  `rental_package_id` integer,
  `rental_hours` integer,
  `license_id` integer,
  `started_at` timestamp,
  `expires_at` timestamp,
  `created_at` timestamp
);

CREATE TABLE `licenses` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `user_id` integer NOT NULL,
  `tool_id` integer,
  `workflow_id` integer,
  `type` varchar(255) NOT NULL COMMENT 'lifetime, rental, trial',
  `status` varchar(255) NOT NULL DEFAULT 'active',
  `key` varchar(255) UNIQUE NOT NULL,
  `started_at` timestamp,
  `expires_at` timestamp,
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `payments` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `order_id` integer NOT NULL,
  `payment_method_id` integer,
  `provider` varchar(255) COMMENT 'momo, binance, bank_qr, ...',
  `amount` integer NOT NULL,
  `currency` varchar(255) DEFAULT 'VND',
  `status` varchar(255) NOT NULL COMMENT 'pending, success, failed, refund',
  `provider_txn_id` varchar(255),
  `raw_response` text COMMENT 'JSON từ cổng thanh toán',
  `paid_at` timestamp,
  `created_at` timestamp
);

CREATE TABLE `payment_methods` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `label` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL COMMENT 'qr, wallet, bank',
  `details` text COMMENT 'địa chỉ ví, số tài khoản, hướng dẫn...',
  `qr_image_url` varchar(255),
  `is_default` boolean DEFAULT false,
  `is_active` boolean DEFAULT true,
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `system_settings` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `key` varchar(255) UNIQUE NOT NULL,
  `value` text,
  `description` varchar(255),
  `updated_at` timestamp
);

CREATE TABLE `support_tickets` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `user_id` integer,
  `tool_id` integer,
  `workflow_id` integer,
  `order_id` integer,
  `subject` varchar(255) NOT NULL,
  `category` varchar(255) COMMENT 'bug, feature, question, billing',
  `priority` varchar(255) DEFAULT 'normal' COMMENT 'low, normal, high',
  `status` varchar(255) DEFAULT 'open' COMMENT 'open, in_progress, resolved, closed',
  `description` text,
  `created_at` timestamp,
  `updated_at` timestamp,
  `closed_at` timestamp
);

CREATE TABLE `support_messages` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `ticket_id` integer NOT NULL,
  `user_id` integer,
  `is_admin` boolean DEFAULT false,
  `message` text NOT NULL,
  `created_at` timestamp
);

CREATE TABLE `user_wallets` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `user_id` integer UNIQUE NOT NULL,
  `balance_dollar` integer NOT NULL DEFAULT 0 COMMENT 'Số dư hiện tại',
  `total_deposit_dollar` integer NOT NULL DEFAULT 0 COMMENT 'Tổng tiền user đã nạp',
  `total_bonus_dollar` integer NOT NULL DEFAULT 0 COMMENT 'Tổng tiền thưởng, voucher cộng thêm',
  `total_spent_dollar` integer NOT NULL DEFAULT 0 COMMENT 'Tổng tiền đã trừ để mua tool, thuê tool',
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `wallet_transactions` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `user_id` integer NOT NULL,
  `type` varchar(255) NOT NULL COMMENT 'deposit, purchase, refund, bonus, adjustment',
  `amount_dollar` integer NOT NULL COMMENT 'số tiền + hoặc -',
  `balance_after` integer NOT NULL COMMENT 'số dư sau giao dịch',
  `order_id` integer,
  `payment_id` integer,
  `meta` text COMMENT 'JSON: mô tả thêm, mã giao dịch, lý do điều chỉnh...',
  `created_at` timestamp
);

ALTER TABLE `wallet_transactions` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `wallet_transactions` ADD FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

ALTER TABLE `wallet_transactions` ADD FOREIGN KEY (`payment_id`) REFERENCES `payments` (`id`);

ALTER TABLE `user_wallets` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `user_sessions` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `password_reset_tokens` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `tool_rental_packages` ADD FOREIGN KEY (`tool_id`) REFERENCES `tools` (`id`);

ALTER TABLE `workflow_test_presets` ADD FOREIGN KEY (`workflow_id`) REFERENCES `workflows` (`id`);

ALTER TABLE `tool_workflows` ADD FOREIGN KEY (`tool_id`) REFERENCES `tools` (`id`);

ALTER TABLE `tool_workflows` ADD FOREIGN KEY (`workflow_id`) REFERENCES `workflows` (`id`);

ALTER TABLE `coupon_usages` ADD FOREIGN KEY (`coupon_id`) REFERENCES `coupons` (`id`);

ALTER TABLE `coupon_usages` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `coupon_usages` ADD FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

ALTER TABLE `blog_posts` ADD FOREIGN KEY (`author_id`) REFERENCES `users` (`id`);

ALTER TABLE `blog_post_tags` ADD FOREIGN KEY (`post_id`) REFERENCES `blog_posts` (`id`);

ALTER TABLE `blog_post_tags` ADD FOREIGN KEY (`tag_id`) REFERENCES `blog_tags` (`id`);

ALTER TABLE `orders` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `orders` ADD FOREIGN KEY (`coupon_id`) REFERENCES `coupons` (`id`);

ALTER TABLE `orders` ADD FOREIGN KEY (`payment_method_id`) REFERENCES `payment_methods` (`id`);

ALTER TABLE `order_items` ADD FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

ALTER TABLE `order_items` ADD FOREIGN KEY (`rental_package_id`) REFERENCES `tool_rental_packages` (`id`);

ALTER TABLE `order_items` ADD FOREIGN KEY (`license_id`) REFERENCES `licenses` (`id`);

ALTER TABLE `licenses` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `licenses` ADD FOREIGN KEY (`tool_id`) REFERENCES `tools` (`id`);

ALTER TABLE `licenses` ADD FOREIGN KEY (`workflow_id`) REFERENCES `workflows` (`id`);

ALTER TABLE `payments` ADD FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

ALTER TABLE `payments` ADD FOREIGN KEY (`payment_method_id`) REFERENCES `payment_methods` (`id`);

ALTER TABLE `support_tickets` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `support_tickets` ADD FOREIGN KEY (`tool_id`) REFERENCES `tools` (`id`);

ALTER TABLE `support_tickets` ADD FOREIGN KEY (`workflow_id`) REFERENCES `workflows` (`id`);

ALTER TABLE `support_tickets` ADD FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

ALTER TABLE `support_messages` ADD FOREIGN KEY (`ticket_id`) REFERENCES `support_tickets` (`id`);

ALTER TABLE `support_messages` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
